
import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    PermissionsAndroid,
    Platform,
    NativeEventEmitter,
    NativeModules,
    Alert,
} from 'react-native';
import { Audio, AVPlaybackSource } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Voice from '@react-native-community/voice';
import { useFocusEffect } from 'expo-router';

// Emitter sólo en nativo
const voiceEmitter =
    Platform.OS !== 'web' ? new NativeEventEmitter(NativeModules.Voice) : null;

interface SpeechOptions {
    onResult: (spoken: string) => void;
    onError: () => void;
}

function useSpeechRecognition({ onResult, onError }: SpeechOptions) {
    const [isRecording, setIsRecording] = useState(false);
    const initialized = useRef(false);

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

    const requestPermission = useCallback(async (): Promise<boolean> => {
        if (Platform.OS !== 'android') return true;
        const res = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: 'Permiso de micrófono',
                message: 'Necesitamos usar el micrófono.',
                buttonNegative: 'Cancelar',
                buttonPositive: 'Aceptar',
            }
        );
        return res === PermissionsAndroid.RESULTS.GRANTED;
    }, []);

    const start = useCallback(async () => {
        if (Platform.OS === 'web') {
            Alert.alert('No soportado', 'Dictación de voz no funciona en web.');
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
            console.log('Speech result:', spoken);
            onResult(spoken);
            stop();
        },
        [onResult, stop]
    );
    const onSpeechErrorEvt = useCallback(() => {
        console.log('Speech recognition error');
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

    useFocusEffect(
        useCallback(() => {
            return () => {
                console.log('Screen lost focus, stopping voice recognition');
                stop();
            };
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

    // Refs to track if audio is currently playing
    const isFeedbackPlaying = useRef(false);
    const isPracticeLoading = useRef(false);
    const audioProgress = useRef(0);

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

    const normalize = (s: string) =>
        s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

    const evaluate = (spoken: string) => {
        const normalizedSpoken = normalize(spoken);
        const normalizedTarget = normalize(targetPhrase);

        console.log('Evaluating speech:', {
            spoken: normalizedSpoken,
            target: normalizedTarget,
            match: normalizedSpoken === normalizedTarget
        });

        if (normalizedSpoken === normalizedTarget) {
            playFeedback(successAudio);
        } else {
            playFeedback(failureAudio);
        }
    };

    const playFeedback = async (file: AVPlaybackSource) => {
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
                            if (file === successAudio && onNext) {
                                stopAll(onNext);
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

    const { isRecording, start, stop } = useSpeechRecognition({
        onResult: evaluate,
        onError: () => playFeedback(failureAudio),
    });

    const togglePracticeAudio = async () => {
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

                        if (status.positionMillis && status.durationMillis) {
                            audioProgress.current = status.positionMillis / status.durationMillis;
                        }

                        if (status.didJustFinish) {
                            setIsPlaying(false);
                            setIsPaused(false);
                            audioProgress.current = 0;
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

    const restartPracticeAudio = async () => {
        if (!practiceSound || isPracticeLoading.current) return;

        try {
            await practiceSound.stopAsync();
            await practiceSound.setPositionAsync(0);
            await practiceSound.playAsync();
            setIsPlaying(true);
            setIsPaused(false);
            audioProgress.current = 0;
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
        audioProgress.current = 0;

        if (nav) {
            nav();
        }
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
                        disabled={isFeedbackPlaying.current}
                    >
                        <Ionicons name={isRecording ? 'mic-off' : 'mic'} size={24} color={isRecording ? 'white' : '#2e6ef7'} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.playButton}
                    onPress={togglePracticeAudio}
                    disabled={isPracticeLoading.current || isFeedbackPlaying.current}
                >
                    <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="white" />
                </TouchableOpacity>

                <View style={styles.progressBarContainer}>
                    <View style={[
                        styles.progressFill,
                        isPlaying ? { width: `${audioProgress.current * 100}%` } : { width: 0 }
                    ]} />
                </View>

                <TouchableOpacity
                    style={styles.restartButton}
                    onPress={restartPracticeAudio}
                    disabled={!practiceSound || isPracticeLoading.current || isFeedbackPlaying.current}
                >
                    <Ionicons name="refresh" size={24} color="white" />
                </TouchableOpacity>

                {onBottomBack && (
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
    container: { flex: 1, backgroundColor: '#1D2233', paddingTop: 60, alignItems: 'center' },
    topBackButton: { position: 'absolute', top: 40, left: 20, backgroundColor: '#f0f0f0', padding: 12, borderRadius: 24, zIndex: 10 },
    wordsContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 80 },
    wordBlock: { backgroundColor: '#fff', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10, marginHorizontal: 4 },
    wordText: { fontSize: 20, fontWeight: '600', color: '#2b2b2b' },
    bottomPanel: {
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 320,
        backgroundColor: '#242C3B', borderTopLeftRadius: 32, borderTopRightRadius: 32,
        padding: 24, alignItems: 'center', elevation: 10
    },
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