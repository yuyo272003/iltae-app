import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    PermissionsAndroid,
    Platform,
} from 'react-native';
import { Audio, AVPlaybackSource } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Voice from '@react-native-community/voice';

interface SentenceSpeakingScreenProps {
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
                                               }: SentenceSpeakingScreenProps) {
    const [practiceSound, setPracticeSound] = useState<Audio.Sound | null>(null);
    const [feedbackSound, setFeedbackSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isRecording, setIsRecording] = useState(false);

    // Configuración de Voice
    useEffect(() => {
        Voice.onSpeechStart = () => setIsRecording(true);
        Voice.onSpeechResults = (e) => {
            const spoken = e.value?.[0] ?? '';
            evaluatePronunciation(spoken);
            setIsRecording(false);
            Keyboard.dismiss();
        };
        Voice.onSpeechError = () => {
            setIsRecording(false);
            playFeedback(failureAudio);
        };
        return () => {
            Voice.destroy().then(() => Voice.removeAllListeners());
        };
    }, [targetPhrase]);

    const requestAudioPermission = async (): Promise<boolean> => {
        if (Platform.OS !== 'android') return true;
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: 'Permiso de micrófono',
                message: 'Necesitamos usar el micrófono para verificar tu pronunciación.',
                buttonNegative: 'Cancelar',
                buttonPositive: 'Aceptar',
            }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    };

    const startRecognizing = async () => {
        if (!(await requestAudioPermission())) {
            playFeedback(failureAudio);
            return;
        }
        try {
            await Voice.start('es-MX');
        } catch (e) {
            console.error('Voice.start error', e);
            setIsRecording(false);
        }
    };

    const stopRecognizing = async () => {
        try {
            await Voice.stop();
        } catch {}
    };

    // Feedback audio
    const playFeedback = async (file: AVPlaybackSource) => {
        if (feedbackSound) {
            await feedbackSound.stopAsync();
            await feedbackSound.unloadAsync();
        }
        const { sound } = await Audio.Sound.createAsync(file);
        setFeedbackSound(sound);
        await sound.playAsync();
        if (file === successAudio) {
            sound.setOnPlaybackStatusUpdate((status) => {
                if (!(status.isLoaded) || status.didJustFinish) {
                    stopAllAndNavigate(onNext);
                }
            });
        }
    };

    // Evaluación de pronunciación
    const normalize = (s: string) =>
        s
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();

    const evaluatePronunciation = (spoken: string) => {
        if (normalize(spoken) === normalize(targetPhrase)) {
            playFeedback(successAudio);
        } else {
            playFeedback(failureAudio);
        }
    };

    // Reproducción de práctica
    const togglePracticeAudio = async () => {
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
            await sound.playAsync();
            setIsPlaying(true);
            sound.setOnPlaybackStatusUpdate((status) => {
                if (!(status.isLoaded) || status.didJustFinish) {
                    setIsPlaying(false);
                    setIsPaused(false);
                }
            });
        }
    };

    const stopAllAndNavigate = async (nav?: () => void) => {
        if (practiceSound) {
            await practiceSound.stopAsync();
            await practiceSound.unloadAsync();
            setPracticeSound(null);
        }
        setIsPlaying(false);
        setIsPaused(false);
        nav?.();
    };

    const restartPracticeAudio = async () => {
        if (practiceSound) {
            await practiceSound.stopAsync();
            await practiceSound.unloadAsync();
        }
        const { sound } = await Audio.Sound.createAsync(practiceAudio);
        setPracticeSound(sound);
        await sound.playAsync();
        setIsPlaying(true);
        setIsPaused(false);
        sound.setOnPlaybackStatusUpdate((status) => {
            if (!(status.isLoaded) || status.didJustFinish) {
                setIsPlaying(false);
                setIsPaused(false);
            }
        });
    };

    return (
        <View style={styles.container}>
            {/* ← Atrás arriba */}
            {onTopBack && (
                <TouchableOpacity style={styles.topBackButton} onPress={onTopBack}>
                    <Ionicons name="arrow-back" size={28} color="#2b2b2b" />
                </TouchableOpacity>
            )}

            {/* Fila de palabras */}
            <View style={styles.wordsContainer}>
                {words.map((w, i) => (
                    <View key={i} style={styles.wordBlock}>
                        <Text style={styles.wordText}>{w}</Text>
                    </View>
                ))}
            </View>

            {/* Panel inferior */}
            <View style={styles.bottomPanel}>
                {/* Micrófono */}
                <View style={styles.micWrapper}>
                    <TouchableOpacity
                        style={[
                            styles.soundButton,
                            isRecording && styles.recordingButton,
                        ]}
                        onPress={() =>
                            isRecording ? stopRecognizing() : startRecognizing()
                        }
                    >
                        <Ionicons
                            name={isRecording ? 'mic-off' : 'mic'}
                            size={24}
                            color={isRecording ? 'white' : '#2e6ef7'}
                        />
                    </TouchableOpacity>
                </View>

                {/* Play práctica */}
                <TouchableOpacity
                    style={styles.playButton}
                    onPress={togglePracticeAudio}
                >
                    <Ionicons
                        name={isPlaying ? 'pause' : 'play'}
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>

                {/* Barra de progreso */}
                <View style={styles.progressBarContainer}>
                    <View
                        style={[
                            styles.progressFill,
                            isPlaying ? { width: '50%' } : { width: 0 },
                        ]}
                    />
                </View>

                {/* Botón Reiniciar */}
                <TouchableOpacity
                    style={styles.restartButton}
                    onPress={restartPracticeAudio}
                >
                    <Ionicons name="refresh" size={24} color="white" />
                </TouchableOpacity>

                {/* Botón Back inferior */}
                {onBottomBack && (
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => stopAllAndNavigate(onBottomBack)}
                    >
                        <Ionicons name="arrow-back" size={24} color="red" />
                    </TouchableOpacity>
                )}

                {/* Siguiente */}
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => stopAllAndNavigate(onNext)}
                >
                    <Ionicons name="arrow-forward" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D2233',
        paddingTop: 60,
        alignItems: 'center',
    },
    topBackButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        backgroundColor: '#f0f0f0',
        padding: 12,
        borderRadius: 24,
        zIndex: 10,
    },
    wordsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 80,
    },
    wordBlock: {
        backgroundColor: '#fff',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 10,
        marginHorizontal: 4,
    },
    wordText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2b2b2b',
    },
    bottomPanel: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 320,
        backgroundColor: '#242C3B',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        alignItems: 'center',
        elevation: 10,
    },
    micWrapper: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginBottom: 16,
    },
    soundButton: {
        width: '100%',
        alignItems: 'center',
    },
    recordingButton: {
        backgroundColor: '#FF5252',
    },
    playButton: {
        backgroundColor: '#2e6ef7',
        padding: 14,
        borderRadius: 12,
        width: '90%',
        alignItems: 'center',
        marginBottom: 12,
    },
    progressBarContainer: {
        height: 6,
        width: '90%',
        backgroundColor: '#ccc',
        borderRadius: 3,
        overflow: 'hidden',
        marginBottom: 24,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#2e6ef7',
    },
    restartButton: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: '#2e6ef7',
        borderRadius: 50,
        padding: 15,
        alignSelf: 'center',
    },
    nextButton: {
        position: 'absolute',
        right: 30,
        bottom: 20,
        backgroundColor: '#33cc66',
        borderRadius: 50,
        padding: 15,
    },
    backButton: {
        position: 'absolute',
        left: 30,
        bottom: 20,
        backgroundColor: '#ffffff',
        borderRadius: 50,
        padding: 15,
    },
});
