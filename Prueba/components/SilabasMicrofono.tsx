import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    PermissionsAndroid,
    Platform,
    Keyboard,
    NativeEventEmitter,
    NativeModules,
    Alert,
} from 'react-native';
import { Audio, AVPlaybackSource } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Voice from '@react-native-community/voice';
import api from '@/scripts/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePathname } from 'expo-router';

// Emitter sólo en nativo
const voiceEmitter =
    Platform.OS !== 'web' ? new NativeEventEmitter(NativeModules.Voice) : null;

type Syllable = { text: string; audio: AVPlaybackSource };

interface Props {
    syllables: Syllable[];
    targetWord: string;
    practiceAudio: AVPlaybackSource;
    successAudio: AVPlaybackSource;
    failureAudio: AVPlaybackSource;
    imageSource?: any;
    onNext?: () => void;
    onTopBack?: () => void;
    onBottomBack?: () => void;
}

// Hook reutilizable de voz mejorado
function useSpeechRecognition(
    onResult: (spoken: string) => void,
    onError: () => void
) {
    const [isRecording, setIsRecording] = useState(false);
    const errorPlayedRef = useRef(false);

    const requestPermission = useCallback(async (): Promise<boolean> => {
        if (Platform.OS !== 'android') return true;
        const res = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: 'Permiso de micrófono',
                message: 'Necesitamos acceso al micrófono.',
                buttonNegative: 'Cancelar',
                buttonPositive: 'Aceptar',
            }
        );
        return res === PermissionsAndroid.RESULTS.GRANTED;
    }, []);

    const start = useCallback(async () => {
        // reset error flag on new start
        errorPlayedRef.current = false;

        if (Platform.OS === 'web') {
            Alert.alert('No soportado', 'Dictación de voz no funciona en web.');
            return;
        }
        if (!(await requestPermission())) {
            if (!errorPlayedRef.current) {
                onError();
                errorPlayedRef.current = true;
            }
            return;
        }
        try {
            await Voice.cancel();
            const extras: Record<string, any> = {};
            if (Platform.OS === 'android') {
                extras['android.speech.extra.SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS'] = 5000;
                extras['android.speech.extra.SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS'] = 5000;
                extras['android.speech.extra.SPEECH_INPUT_MINIMUM_LENGTH_MILLIS'] = 10000;
            }
            await Voice.start('es-MX', extras);
            setIsRecording(true);
        } catch (e) {
            console.error('Voice.start error', e);
            setIsRecording(false);
            if (!errorPlayedRef.current) {
                onError();
                errorPlayedRef.current = true;
            }
        }
    }, [requestPermission, onError]);

    const stop = useCallback(async () => {
        if (Platform.OS === 'web') return;
        try {
            await Voice.stop();
            await Voice.cancel();
        } catch (e) {
            console.error('Voice.stop error', e);
        } finally {
            setIsRecording(false);
            Keyboard.dismiss();
        }
    }, []);

    const onSpeechStart = useCallback(() => {
        setIsRecording(true);
    }, []);

    const onSpeechResults = useCallback(
        ({ value }: any) => {
            const spoken = value?.[0] ?? '';
            onResult(spoken);
            stop();
        },
        [onResult, stop]
    );

    const onSpeechErrorEvt = useCallback(() => {
        if (!errorPlayedRef.current) {
            onError();
            errorPlayedRef.current = true;
        }
        stop();
    }, [onError, stop]);

    const onSpeechEnd = useCallback(() => {
        // Reactivar el botón al terminar aunque no haya resultados
        setIsRecording(false);
    }, []);

    useEffect(() => {
        // Limpieza previa
        Voice.destroy().then(() => Voice.removeAllListeners());

        if (!voiceEmitter) return;
        const subs = [
            voiceEmitter.addListener('onSpeechStart', onSpeechStart),
            voiceEmitter.addListener('onSpeechResults', onSpeechResults),
            voiceEmitter.addListener('onSpeechError', onSpeechErrorEvt),
            voiceEmitter.addListener('onSpeechEnd', onSpeechEnd),
        ];
        return () => {
            subs.forEach((s) => s.remove());
            Voice.destroy().then(() => Voice.removeAllListeners());
        };
    }, [onSpeechStart, onSpeechResults, onSpeechErrorEvt, onSpeechEnd]);

    return { isRecording, start, stop };
}

export default function SyllableScreen({
                                           syllables,
                                           targetWord,
                                           practiceAudio,
                                           successAudio,
                                           failureAudio,
                                           imageSource,
                                           onNext,
                                           onTopBack,
                                           onBottomBack,
                                       }: Props) {
    const [practiceSound, setPracticeSound] = useState<Audio.Sound | null>(null);
    const [feedbackSound, setFeedbackSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [userProgress, setUserProgress] = useState(0);
    const pathname = usePathname();

    const noBottom = [
        '/niveles/nivel4/leccion1/firstScreen',
        '/niveles/nivel4/leccion2/firstScreen',
        '/niveles/nivel4/leccion3/firstScreen',
        '/niveles/nivel4/leccion4/firstScreen',
    ];
    const isFirst = pathname.endsWith('/firstScreen');
    const showBottom = !noBottom.includes(pathname);

    const normalize = (s: string) =>
        s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

    // Hook de voz
    const { isRecording, start, stop } = useSpeechRecognition(
        (spoken: string) => {
            normalize(spoken) === normalize(targetWord)
                ? playFeedback(successAudio, onNext)
                : playFeedback(failureAudio);
        },
        () => playFeedback(failureAudio)
    );

    // Carga progreso
    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem('auth_token');
            if (!token) return;
            try {
                const { data } = await api.get('/progreso', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserProgress(data.porcentaje || 0);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    const playFeedback = async (file: AVPlaybackSource, nav?: () => void) => {
        if (feedbackSound) {
            await feedbackSound.stopAsync();
            await feedbackSound.unloadAsync();
        }
        if (Platform.OS === 'web') return;
        const { sound } = await Audio.Sound.createAsync(file);
        setFeedbackSound(sound);
        await sound.playAsync();
        if (file === successAudio && nav) {
            sound.setOnPlaybackStatusUpdate((status) => {
                if (!status.isLoaded || status.didJustFinish) nav();
            });
        }
    };

    const togglePractice = async () => {
        if (Platform.OS === 'web') return;
        if (practiceSound && isPlaying) {
            await practiceSound.pauseAsync();
            setIsPlaying(false);
            setIsPaused(true);
        } else if (practiceSound && isPaused) {
            await practiceSound.playAsync();
            setIsPlaying(true);
            setIsPaused(false);
        } else {
            const { sound } = await Audio.Sound.createAsync(practiceAudio);
            setPracticeSound(sound);
            setIsPlaying(true);
            await sound.playAsync();
            sound.setOnPlaybackStatusUpdate((status) => {
                if (!status.isLoaded || status.didJustFinish) {
                    setIsPlaying(false);
                    setIsPaused(false);
                }
            });
        }
    };

    const restartPractice = async () => {
        if (!practiceSound) return;
        await practiceSound.stopAsync();
        await practiceSound.setPositionAsync(0);
        await practiceSound.playAsync();
        setIsPlaying(true);
        setIsPaused(false);
    };

    const stopAll = async (nav?: () => void) => {
        if (practiceSound) {
            await practiceSound.stopAsync();
            await practiceSound.unloadAsync();
            setPracticeSound(null);
        }
        setIsPlaying(false);
        setIsPaused(false);
        nav?.();
    };

    return (
        <View style={styles.container}>
            {onTopBack && (
                <TouchableOpacity
                    style={styles.topBackButton}
                    onPress={() => stopAll(onTopBack)}
                >
                    <Ionicons name="arrow-back" size={28} color="#2b2b2b" />
                </TouchableOpacity>
            )}

            {imageSource && (
                <Image
                    source={imageSource}
                    style={styles.illustration}
                    resizeMode="contain"
                />
            )}

            <View style={styles.syllablesRow}>
                {syllables.map((s, i) => (
                    <React.Fragment key={i}>
                        <View style={styles.syllableContainer}>
                            <Text style={styles.syllableText}>{s.text}</Text>
                            <TouchableOpacity
                                style={styles.syllableAudioButton}
                                onPress={async () => {
                                    if (Platform.OS === 'web') return;
                                    const { sound } = await Audio.Sound.createAsync(s.audio);
                                    await sound.playAsync();
                                }}
                            >
                                <Ionicons name="volume-high" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                        {i < syllables.length - 1 && (
                            <Text style={styles.hyphen}>-</Text>
                        )}
                    </React.Fragment>
                ))}
            </View>

            <View
                style={[
                    styles.bottomPanel,
                    !isFirst && styles.bottomPanelReduced,
                ]}
            >
                <View
                    style={[
                        styles.micWrapper,
                        !isFirst && styles.micWrapperRepositioned,
                    ]}
                >
                    <TouchableOpacity
                        style={[
                            styles.soundButton,
                            isRecording && styles.recordingButton,
                        ]}
                        onPress={() => (isRecording ? stop() : start())}
                    >
                        <Ionicons
                            name={isRecording ? 'mic-off' : 'mic'}
                            size={24}
                            color={isRecording ? 'white' : '#2e6ef7'}
                        />
                    </TouchableOpacity>
                </View>

                {isFirst ? (
                    <TouchableOpacity
                        style={styles.playButton}
                        onPress={togglePractice}
                    >
                        <Ionicons
                            name={isPlaying ? 'pause' : 'play'}
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                ) : (
                    <View style={{ height: 20 }} />
                )}

                <View
                    style={[
                        styles.progressBarContainer,
                        !isFirst && { marginTop: 20, marginBottom: 30 },
                    ]}
                >
                    <View style={[styles.progressFill, { flex: userProgress }]} />
                    <View style={{ flex: 100 - userProgress }} />
                </View>

                {isFirst && (
                    <TouchableOpacity
                        style={styles.restartButton}
                        onPress={restartPractice}
                    >
                        <Ionicons name="refresh" size={24} color="white" />
                    </TouchableOpacity>
                )}

                {showBottom && (
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => stopAll(onBottomBack)}
                    >
                        <Ionicons name="arrow-back" size={24} color="red" />
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => stopAll(onNext)}
                >
                    <Ionicons name="arrow-forward" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', alignItems: 'center', paddingTop: 150 },
    topBackButton: {
        position: 'absolute', top: 40, left: 20, zIndex: 10,
        backgroundColor: '#f0f0f0', padding: 12, borderRadius: 24,
    },
    illustration: { width: 180, height: 180, marginBottom: 10, marginTop: 15 },
    syllablesRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 120, marginTop: 10 },
    syllableContainer: { alignItems: 'center', marginHorizontal: 8 },
    syllableText: { fontSize: 28, fontWeight: 'bold', color: '#2b2b2b' },
    hyphen: { fontSize: 28, color: '#2b2b2b', marginHorizontal: 4 },
    syllableAudioButton: {
        backgroundColor: '#2e6ef7', width: 32, height: 32,
        justifyContent: 'center', alignItems: 'center', borderRadius: 16, marginTop: 4,
    },
    bottomPanel: {
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 320,
        backgroundColor: '#242C3B', borderTopLeftRadius: 32, borderTopRightRadius: 32,
        padding: 24, alignItems: 'center', elevation: 10,
    },
    bottomPanelReduced: { height: 220, paddingHorizontal: 24, paddingTop: 70, paddingBottom: 24 },
    micWrapper: {
        borderRadius: 12, alignItems: 'center', marginBottom: 20, marginTop: 10,
        borderColor: '#2e6ef7', borderWidth: 1, backgroundColor: '#fff', width: '100%',
    },
    micWrapperRepositioned: { position: 'absolute', top: 10, width: '90%' },
    soundButton: { backgroundColor: 'white', width: '90%', padding: 16, borderRadius: 8, alignItems: 'center' },
    recordingButton: { backgroundColor: '#FF5252' },
    playButton: {
        backgroundColor: '#2e6ef7', padding: 16, borderRadius: 12,
        width: '100%', alignItems: 'center', marginBottom: 20, marginTop: 10,
    },
    progressBarContainer: {
        flexDirection: 'row', height: 6, width: '90%', borderRadius: 3,
        overflow: 'hidden', marginBottom: 50, backgroundColor: '#555',
    },
    progressFill: { height: '100%', backgroundColor: '#2e6ef7', borderRadius: 3 },
    restartButton: { position: 'absolute', bottom: 20, backgroundColor: '#2e6ef7', borderRadius: 50, padding: 15, alignSelf: 'center' },
    nextButton: { position: 'absolute', right: 30, bottom: 20, backgroundColor: '#33cc66', borderRadius: 50, padding: 15 },
    backButton: { position: 'absolute', left: 30, bottom: 20, backgroundColor: '#ffffff', borderRadius: 50, padding: 15 },
});
