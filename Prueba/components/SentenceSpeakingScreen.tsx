import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    PermissionsAndroid,
    Platform,
    NativeModules,
    NativeEventEmitter,
    Alert,
} from 'react-native';
import { Audio, AVPlaybackSource } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Voice from '@react-native-community/voice';
import { useFocusEffect } from 'expo-router';

// Emitter sólo en native (iOS/Android)
const voiceEmitter =
    Platform.OS !== 'web' ? new NativeEventEmitter(NativeModules.Voice) : null;

interface SpeechOptions {
    onResult: (spoken: string) => void;
    onError: () => void;
}

// Hook de reconocimiento de voz con extras para Android
function useSpeechRecognition({ onResult, onError }: SpeechOptions) {
    const [isRecording, setIsRecording] = useState(false);

    const requestPermission = React.useCallback(async (): Promise<boolean> => {
        if (Platform.OS !== 'android') return true;
        const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: 'Permiso de micrófono',
                message: 'Necesitamos usar el micrófono para verificar tu pronunciación.',
                buttonNegative: 'Cancelar',
                buttonPositive: 'Aceptar',
            }
        );
        return result === PermissionsAndroid.RESULTS.GRANTED;
    }, []);

    const start = React.useCallback(async () => {
        if (Platform.OS === 'web') {
            Alert.alert('No soportado', 'Dictación de voz no funciona en web.');
            return;
        }
        if (!(await requestPermission())) {
            onError();
            return;
        }
        try {
            await Voice.cancel();
            // Extender tiempos de silencio en Android
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
            onError();
        }
    }, [requestPermission, onError]);

    const stop = React.useCallback(async () => {
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

    const onSpeechStart = React.useCallback(() => setIsRecording(true), []);
    const onSpeechResults = React.useCallback(
        ({ value }: any) => {
            const spoken = value?.[0] ?? '';
            onResult(spoken);
            stop();
        },
        [onResult, stop]
    );
    const onSpeechErrorEvt = React.useCallback(() => {
        console.warn('Speech recognition error');
        stop();
        onError();
    }, [onError, stop]);

    React.useEffect(() => {
        if (!voiceEmitter) return;
        const subs = [
            voiceEmitter.addListener('onSpeechStart', onSpeechStart),
            voiceEmitter.addListener('onSpeechResults', onSpeechResults),
            voiceEmitter.addListener('onSpeechError', onSpeechErrorEvt),
        ];
        return () => subs.forEach(s => s.remove());
    }, [onSpeechStart, onSpeechResults, onSpeechErrorEvt]);

    useFocusEffect(
        React.useCallback(() => {
            return () => stop();
        }, [stop])
    );

    return { isRecording, start, stop };
}

interface Props {
    words: string[];
    targetPhrase: string;
    practiceAudio: AVPlaybackSource;
    successAudio: AVPlaybackSource;
    failureAudio: AVPlaybackSource;
    onNext?: () => void;
    onTopBack?: () => void;
    onBottomBack?: () => void;
}

export default function SentenceSpeakingScreen({
                                                   words,
                                                   targetPhrase,
                                                   practiceAudio,
                                                   successAudio,
                                                   failureAudio,
                                                   onNext,
                                                   onTopBack,
                                                   onBottomBack,
                                               }: Props) {
    const [practiceSound, setPracticeSound] = useState<Audio.Sound | null>(null);
    const [feedbackSound, setFeedbackSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const normalize = (s: string) =>
        s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

    const playFeedback = async (file: AVPlaybackSource) => {
        if (feedbackSound) {
            await feedbackSound.stopAsync();
            await feedbackSound.unloadAsync();
        }
        if (Platform.OS !== 'web') {
            const { sound } = await Audio.Sound.createAsync(file);
            setFeedbackSound(sound);
            await sound.playAsync();
            if (file === successAudio) {
                sound.setOnPlaybackStatusUpdate(status => {
                    if (!status.isLoaded || status.didJustFinish) stopAll(onNext);
                });
            }
        }
    };

    const evaluate = (spoken: string) => {
        normalize(spoken) === normalize(targetPhrase)
            ? playFeedback(successAudio)
            : playFeedback(failureAudio);
    };

    const { isRecording, start, stop } = useSpeechRecognition({
        onResult: evaluate,
        onError: () => playFeedback(failureAudio),
    });

    const togglePracticeAudio = async () => {
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
            sound.setOnPlaybackStatusUpdate(status => {
                if (!status.isLoaded || status.didJustFinish) {
                    setIsPlaying(false);
                    setIsPaused(false);
                }
            });
        }
    };

    const restartPracticeAudio = async () => {
        if (practiceSound) {
            await practiceSound.stopAsync();
            await practiceSound.setPositionAsync(0);
            await practiceSound.playAsync();
            setIsPlaying(true);
            setIsPaused(false);
        }
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
                <TouchableOpacity style={styles.topBackButton} onPress={onTopBack}>
                    <Ionicons name="arrow-back" size={28} color="#2b2b2b" />
                </TouchableOpacity>
            )}
            <View style={styles.wordsContainer}>
                {words.map((w, i) => (
                    <View key={i} style={styles.wordBlock}>
                        <Text style={styles.wordText}>{w}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.bottomPanel}>
                <View style={styles.micWrapper}>
                    <TouchableOpacity
                        style={[styles.soundButton, isRecording && styles.recordingButton]}
                        onPress={() => (isRecording ? stop() : start())}
                    >
                        <Ionicons
                            name={isRecording ? 'mic-off' : 'mic'}
                            size={24}
                            color={isRecording ? 'white' : '#2e6ef7'}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.playButton} onPress={togglePracticeAudio}>
                    <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.progressBarContainer}>
                    <View style={[styles.progressFill, isPlaying ? { width: '50%' } : { width: 0 }]} />
                </View>
                <TouchableOpacity style={styles.restartButton} onPress={restartPracticeAudio}>
                    <Ionicons name="refresh" size={24} color="white" />
                </TouchableOpacity>
                {onBottomBack && (
                    <TouchableOpacity style={styles.backButton} onPress={() => stopAll(onBottomBack)}>
                        <Ionicons name="arrow-back" size={24} color="red" />
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.nextButton} onPress={() => stopAll(onNext)}>
                    <Ionicons name="arrow-forward" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1D2233', paddingTop: 60, alignItems: 'center' },
    topBackButton: { position: 'absolute', top: 40, left: 20, backgroundColor: '#f0f0f0', padding: 12, borderRadius: 24, zIndex: 10 },
    wordsContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 80 },
    wordBlock: { backgroundColor: '#fff', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10, marginHorizontal: 4 },
    wordText: { fontSize: 20, fontWeight: '600', color: '#2b2b2b' },
    bottomPanel: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 320, backgroundColor: '#242C3B', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, alignItems: 'center', elevation: 10 },
    micWrapper: { width: '90%', backgroundColor: '#fff', borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 16 },
    soundButton: { width: '100%', alignItems: 'center' },
    recordingButton: { backgroundColor: '#FF5252' },
    playButton: { backgroundColor: '#2e6ef7', padding: 14, borderRadius: 12, width: '90%', alignItems: 'center', marginBottom: 12 },
    progressBarContainer: { height: 6, width: '90%', backgroundColor: '#ccc', borderRadius: 3, overflow: 'hidden', marginBottom: 24 },
    progressFill: { height: '100%', backgroundColor: '#2e6ef7' },
    restartButton: { position: 'absolute', bottom: 20, backgroundColor: '#2e6ef7', borderRadius: 50, padding: 15, alignSelf: 'center' },
    nextButton: { position: 'absolute', right: 30, bottom: 20, backgroundColor: '#33cc66', borderRadius: 50, padding: 15 },
    backButton: { position: 'absolute', left: 30, bottom: 20, backgroundColor: '#ffffff', borderRadius: 50, padding: 15 },
});
