import React, { useEffect, useState, useCallback, useRef } from 'react';
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

// Hook reutilizable de voz
function useSpeechRecognition(
    onResult: (spoken: string) => void,
    onError: () => void
) {
    const [isRecording, setIsRecording] = useState(false);
    const initialized = useRef(false);

    const requestPermission = useCallback(async () => {
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

    // Initialize Voice on first mount
    useEffect(() => {
        if (Platform.OS === 'web' || initialized.current) return;

        const setupVoice = async () => {
            try {
                await Voice.destroy();
                await Voice.removeAllListeners();
                initialized.current = true;
            } catch (e) {
                console.error('Voice setup error', e);
            }
        };

        setupVoice();

        // Cleanup on unmount
        return () => {
            const cleanupVoice = async () => {
                if (Platform.OS === 'web') return;
                try {
                    await Voice.destroy();
                    await Voice.removeAllListeners();
                } catch (e) {
                    console.error('Voice cleanup error', e);
                }
            };
            cleanupVoice();
        };
    }, []);

    const start = useCallback(async () => {
        if (Platform.OS === 'web') {
            Alert.alert('No soportado', 'Voice no funciona en web.');
            return;
        }

        if (isRecording) {
            await stop();
        }

        if (!(await requestPermission())) {
            onError();
            return;
        }

        try {
            await Voice.cancel();
            // Extiende silencio en Android
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
    }, [requestPermission, onError, isRecording]);

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

    const onSpeechStart = useCallback(() => setIsRecording(true), []);
    const onSpeechResults = useCallback(
        ({ value }: any) => {
            const spoken = value?.[0] ?? '';
            onResult(spoken);
            stop(); // detenemos justo en el primer resultado
        },
        [onResult, stop]
    );
    const onSpeechErrorEvt = useCallback(() => {
        onError();
        stop();
    }, [onError, stop]);

    useEffect(() => {
        if (!voiceEmitter) return;

        const subs = [
            voiceEmitter.addListener('onSpeechStart', onSpeechStart),
            voiceEmitter.addListener('onSpeechResults', onSpeechResults),
            voiceEmitter.addListener('onSpeechError', onSpeechErrorEvt),
        ];

        return () => {
            subs.forEach(s => s.remove());
        };
    }, [onSpeechStart, onSpeechResults, onSpeechErrorEvt]);

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

    // Refs to track if audio is currently playing
    const isFeedbackPlaying = useRef(false);
    const isPracticeLoading = useRef(false);

    const noBottom = [
        '/niveles/nivel4/leccion1/firstScreen',
        '/niveles/nivel4/leccion2/firstScreen',
        '/niveles/nivel4/leccion3/firstScreen',
        '/niveles/nivel4/leccion4/firstScreen',
    ];
    const isFirst = pathname.endsWith('/firstScreen');
    const showBottom = !noBottom.includes(pathname);

    // Initialize Audio session
    useEffect(() => {
        const setAudioMode = async () => {
            if (Platform.OS === 'web') return;

            try {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                    staysActiveInBackground: false,
                    shouldDuckAndroid: true,
                    playThroughEarpieceAndroid: false,
                });
            } catch (e) {
                console.error('Failed to set audio mode', e);
            }
        };

        setAudioMode();
    }, []);

    // Cleanup all audio resources on unmount
    useEffect(() => {
        return () => {
            const cleanup = async () => {
                if (practiceSound) {
                    try {
                        await practiceSound.stopAsync();
                        await practiceSound.unloadAsync();
                    } catch (e) {
                        console.error('Error cleaning up practice sound', e);
                    }
                }

                if (feedbackSound) {
                    try {
                        await feedbackSound.stopAsync();
                        await feedbackSound.unloadAsync();
                    } catch (e) {
                        console.error('Error cleaning up feedback sound', e);
                    }
                }
            };

            cleanup();
        };
    }, []);

    // Voz
    const { isRecording, start, stop } = useSpeechRecognition(
        (spoken: string) => evaluatePronunciation(spoken),
        () => playFeedback(failureAudio)
    );

    // Cargar progreso
    useEffect(() => {
        const loadProgress = async () => {
            const token = await AsyncStorage.getItem('auth_token');
            if (!token) return;

            try {
                const { data } = await api.get('/progreso', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserProgress(data.porcentaje || 0);
            } catch (e) {
                console.error('Error loading progress', e);
            }
        };

        loadProgress();
    }, []);

    const normalize = (s: string) =>
        s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

    const evaluatePronunciation = (spoken: string) => {
        const normalizedSpoken = normalize(spoken);
        const normalizedTarget = normalize(targetWord);

        console.log('Evaluating pronunciation:', {
            spoken: normalizedSpoken,
            target: normalizedTarget,
            match: normalizedSpoken === normalizedTarget
        });

        if (normalizedSpoken === normalizedTarget) {
            playFeedback(successAudio, onNext);
        } else {
            playFeedback(failureAudio);
        }
    };

    const playFeedback = async (file: AVPlaybackSource, nav?: () => void) => {
        if (isFeedbackPlaying.current) return;
        isFeedbackPlaying.current = true;

        // Stop any previous feedback sound
        if (feedbackSound) {
            try {
                await feedbackSound.stopAsync();
                await feedbackSound.unloadAsync();
            } catch (e) {
                console.error('Error stopping previous feedback sound', e);
            }
        }

        if (Platform.OS === 'web') {
            isFeedbackPlaying.current = false;
            return;
        }

        try {
            const { sound } = await Audio.Sound.createAsync(file,
                { shouldPlay: true },
                (status) => {
                    if (!status.isLoaded) return;

                    if (status.didJustFinish) {
                        isFeedbackPlaying.current = false;

                        // Cleanup after playback
                        const cleanupSound = async () => {
                            try {
                                await sound.unloadAsync();
                                setFeedbackSound(null);
                            } catch (e) {
                                console.error('Error unloading feedback sound', e);
                            }

                            // Navigate if needed
                            if (file === successAudio && nav) {
                                nav();
                            }
                        };

                        cleanupSound();
                    }
                }
            );

            setFeedbackSound(sound);
        } catch (e) {
            console.error('Error playing feedback sound', e);
            isFeedbackPlaying.current = false;
        }
    };

    const togglePractice = async () => {
        if (Platform.OS === 'web' || isPracticeLoading.current) return;

        if (practiceSound && isPlaying) {
            try {
                await practiceSound.pauseAsync();
                setIsPlaying(false);
                setIsPaused(true);
            } catch (e) {
                console.error('Error pausing practice sound', e);
            }
        } else if (practiceSound && isPaused) {
            try {
                await practiceSound.playAsync();
                setIsPlaying(true);
                setIsPaused(false);
            } catch (e) {
                console.error('Error resuming practice sound', e);
            }
        } else {
            // Create and play new sound
            isPracticeLoading.current = true;

            try {
                const { sound } = await Audio.Sound.createAsync(
                    practiceAudio,
                    { shouldPlay: true },
                    (status) => {
                        if (!status.isLoaded) return;

                        if (status.didJustFinish) {
                            setIsPlaying(false);
                            setIsPaused(false);
                        }
                    }
                );

                setPracticeSound(sound);
                setIsPlaying(true);
                isPracticeLoading.current = false;
            } catch (e) {
                console.error('Error creating practice sound', e);
                isPracticeLoading.current = false;
            }
        }
    };

    const restartPractice = async () => {
        if (!practiceSound || isPracticeLoading.current) return;

        try {
            await practiceSound.stopAsync();
            await practiceSound.setPositionAsync(0);
            await practiceSound.playAsync();
            setIsPlaying(true);
            setIsPaused(false);
        } catch (e) {
            console.error('Error restarting practice sound', e);
        }
    };

    const stopAll = async (nav?: () => void) => {
        if (isRecording) {
            await stop();
        }

        if (practiceSound) {
            try {
                await practiceSound.stopAsync();
                await practiceSound.unloadAsync();
                setPracticeSound(null);
            } catch (e) {
                console.error('Error stopping practice sound', e);
            }
        }

        if (feedbackSound) {
            try {
                await feedbackSound.stopAsync();
                await feedbackSound.unloadAsync();
                setFeedbackSound(null);
            } catch (e) {
                console.error('Error stopping feedback sound', e);
            }
        }

        setIsPlaying(false);
        setIsPaused(false);

        if (nav) {
            nav();
        }
    };

    const playSyllableAudio = async (syllableAudio: AVPlaybackSource) => {
        if (Platform.OS === 'web') return;

        try {
            const { sound } = await Audio.Sound.createAsync(syllableAudio);
            await sound.playAsync();

            // Cleanup after playback
            sound.setOnPlaybackStatusUpdate((status) => {
                if (!status.isLoaded || status.didJustFinish) {
                    sound.unloadAsync();
                }
            });
        } catch (e) {
            console.error('Error playing syllable audio', e);
        }
    };

    return (
        <View style={styles.container}>
            {onTopBack && (
                <TouchableOpacity style={styles.topBackButton} onPress={() => stopAll(onTopBack)}>
                    <Ionicons name="arrow-back" size={28} color="#2b2b2b" />
                </TouchableOpacity>
            )}

            {imageSource && <Image source={imageSource} style={styles.illustration} resizeMode="contain" />}

            <View style={styles.syllablesRow}>
                {syllables.map((s, i) => (
                    <React.Fragment key={i}>
                        <View style={styles.syllableContainer}>
                            <Text style={styles.syllableText}>{s.text}</Text>
                            <TouchableOpacity
                                style={styles.syllableAudioButton}
                                onPress={() => playSyllableAudio(s.audio)}
                            >
                                <Ionicons name="volume-high" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                        {i < syllables.length - 1 && <Text style={styles.hyphen}>-</Text>}
                    </React.Fragment>
                ))}
            </View>

            <View style={[styles.bottomPanel, !isFirst && styles.bottomPanelReduced]}>
                <View style={[styles.micWrapper, !isFirst && styles.micWrapperRepositioned]}>
                    <TouchableOpacity
                        style={[styles.soundButton, isRecording && styles.recordingButton]}
                        onPress={() => (isRecording ? stop() : start())}
                        disabled={isFeedbackPlaying.current}
                    >
                        <Ionicons name={isRecording ? 'mic-off' : 'mic'} size={24} color={isRecording ? 'white' : '#2e6ef7'} />
                    </TouchableOpacity>
                </View>

                {isFirst ? (
                    <TouchableOpacity
                        style={styles.playButton}
                        onPress={togglePractice}
                        disabled={isPracticeLoading.current || isFeedbackPlaying.current}
                    >
                        <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="white" />
                    </TouchableOpacity>
                ) : (
                    <View style={{ height: 20 }} />
                )}

                <View style={[styles.progressBarContainer, !isFirst && { marginTop: 20, marginBottom: 30 }]}>
                    <View style={[styles.progressFill, { flex: userProgress }]} />
                    <View style={{ flex: 100 - userProgress }} />
                </View>

                {isFirst && (
                    <TouchableOpacity
                        style={styles.restartButton}
                        onPress={restartPractice}
                        disabled={!practiceSound || isPracticeLoading.current || isFeedbackPlaying.current}
                    >
                        <Ionicons name="refresh" size={24} color="white" />
                    </TouchableOpacity>
                )}

                {showBottom && (
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
    container: { flex: 1, backgroundColor: 'white', alignItems: 'center', paddingTop: 150 },
    topBackButton: {
        position: 'absolute', top: 40, left: 20, zIndex: 10,
        backgroundColor: '#f0f0f0', padding: 12, borderRadius: 24
    },
    illustration: { width: 180, height: 180, marginBottom: 10, marginTop: 15 },
    syllablesRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 120, marginTop: 10 },
    syllableContainer: { alignItems: 'center', marginHorizontal: 8 },
    syllableText: { fontSize: 28, fontWeight: 'bold', color: '#2b2b2b' },
    hyphen: { fontSize: 28, color: '#2b2b2b', marginHorizontal: 4 },
    syllableAudioButton: {
        backgroundColor: '#2e6ef7', width: 32, height: 32,
        justifyContent: 'center', alignItems: 'center', borderRadius: 16, marginTop: 4
    },
    bottomPanel: {
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 320,
        backgroundColor: '#242C3B', borderTopLeftRadius: 32, borderTopRightRadius: 32,
        padding: 24, alignItems: 'center', elevation: 10
    },
    bottomPanelReduced: { height: 220, paddingHorizontal: 24, paddingTop: 70, paddingBottom: 24 },
    micWrapper: {
        borderRadius: 12, alignItems: 'center', marginBottom: 20, marginTop: 10,
        borderColor: '#2e6ef7', borderWidth: 1, backgroundColor: '#fff', width: '100%'
    },
    micWrapperRepositioned: { position: 'absolute', top: 10, width: '90%' },
    soundButton: { backgroundColor: 'white', width: '90%', padding: 16, borderRadius: 8, alignItems: 'center' },
    recordingButton: { backgroundColor: '#FF5252' },
    playButton: {
        backgroundColor: '#2e6ef7', padding: 16, borderRadius: 12,
        width: '100%', alignItems: 'center', marginBottom: 20, marginTop: 10
    },
    progressBarContainer: {
        flexDirection: 'row', height: 6, width: '90%', borderRadius: 3,
        overflow: 'hidden', marginBottom: 50, backgroundColor: '#555'
    },
    progressFill: { height: '100%', backgroundColor: '#2e6ef7', borderRadius: 3 },
    restartButton: {
        position: 'absolute', bottom: 20, backgroundColor: '#2e6ef7',
        borderRadius: 50, padding: 15, alignSelf: 'center'
    },
    nextButton: {
        position: 'absolute', right: 30, bottom: 20,
        backgroundColor: '#33cc66', borderRadius: 50, padding: 15
    },
    backButton: {
        position: 'absolute', left: 30, bottom: 20,
        backgroundColor: '#ffffff', borderRadius: 50, padding: 15
    },
});