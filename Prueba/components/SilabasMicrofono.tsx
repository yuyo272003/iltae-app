import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    PermissionsAndroid,
    Platform,
    Keyboard,
} from 'react-native';
import { Audio, AVPlaybackSource } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Voice from '@react-native-community/voice';
import api from '@/scripts/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router, usePathname} from 'expo-router'

type Syllable = {
    text: string;
    audio: AVPlaybackSource;
};

type SyllableScreenProps = {
    syllables: Syllable[];
    /** La palabra completa que debe decir el usuario */
    targetWord: string;
    practiceAudio: AVPlaybackSource;
    /** Audio de éxito */
    successAudio: AVPlaybackSource;
    /** Audio de error */
    failureAudio: AVPlaybackSource;
    imageSource?: any;
    onNext?: () => void;
    onTopBack?: () => void;
    onBottomBack?: () => void;
};

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
                                       }: SyllableScreenProps) {
    const [practiceSound, setPracticeSound] = useState<Audio.Sound | null>(null);
    const [feedbackSound, setFeedbackSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [userProgress, setUserProgress] = useState<number>(0);
    const [isRecording, setIsRecording] = useState(false);
    const pathname = usePathname();
    const noBottomBackPaths = [
        '/niveles/nivel4/leccion1/firstScreen',
        '/niveles/nivel4/leccion2/firstScreen',
        '/niveles/nivel4/leccion3/firstScreen',
        '/niveles/nivel4/leccion4/firstScreen'
      ];
      

    // Carga el progreso
    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem('auth_token');
            if (!token) return;
            try {
                const resp = await api.get('/progreso', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserProgress(resp.data.porcentaje || 0);
            } catch (e) {
                console.error('Error cargando progreso', e);
            }
        })();
    }, []);

    // Configura Voice
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
    }, [targetWord]);

    const requestAudioPermission = async (): Promise<boolean> => {
        if (Platform.OS !== 'android') return true;
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: 'Permiso de micrófono',
                message: 'Necesitamos usar el micrófono para dictar la palabra.',
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

    // Reproduce audio de feedback y navega tras éxito
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

    const normalize = (s: string) =>
        s
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();

    const evaluatePronunciation = (spoken: string) => {
        const said = normalize(spoken);
        const expected = normalize(targetWord);
        if (said === expected) {
            playFeedback(successAudio);
        } else {
            playFeedback(failureAudio);
        }
    };

    // Audio de práctica
    const playSound = async (file: AVPlaybackSource) => {
        const { sound } = await Audio.Sound.createAsync(file);
        await sound.playAsync();
    };

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

    const restartPracticeAudio = async () => {
        if (practiceSound) {
            await practiceSound.stopAsync();
            await practiceSound.setPositionAsync(0);
            await practiceSound.playAsync();
            setIsPlaying(true);
            setIsPaused(false);
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
    
    const showBottomBack = !noBottomBackPaths.includes(pathname);
      
    return (
        <View style={styles.container}>
            {/* ← Atrás arriba */}
            <TouchableOpacity
                style={styles.topBackButton}
                onPress={() => stopAllAndNavigate(onTopBack)}
            >
                <Ionicons name="arrow-back" size={28} color="#2b2b2b" />
            </TouchableOpacity>

            {/* Ilustración */}
            {imageSource && (
                <Image
                    source={imageSource}
                    style={styles.illustration}
                    resizeMode="contain"
                />
            )}

            {/* Sílabas */}
            <View style={styles.syllablesRow}>
                {syllables.map((s, i) => (
                    <React.Fragment key={i}>
                        <View style={styles.syllableContainer}>
                            <Text style={styles.syllableText}>{s.text}</Text>
                            <TouchableOpacity
                                style={styles.syllableAudioButton}
                                onPress={() => playSound(s.audio)}
                            >
                                <Ionicons name="volume-high" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                        {i < syllables.length - 1 && <Text style={styles.hyphen}>-</Text>}
                    </React.Fragment>
                ))}
            </View>

            {/* Panel inferior */}
            <View style={styles.bottomPanel}>
                {/* Micrófono */}
                <View style={styles.micWrapper}>
                    <TouchableOpacity
                        style={[styles.soundButton, isRecording && styles.recordingButton]}
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
                    <View style={[styles.progressFill, { flex: userProgress }]} />
                    <View style={{ flex: 100 - userProgress }} />
                </View>

                {/* Reiniciar */}
                <TouchableOpacity
                    style={styles.restartButton}
                    onPress={restartPracticeAudio}
                >
                    <Ionicons name="refresh" size={24} color="white" />
                </TouchableOpacity>

                {/* Back inferior */}
                {showBottomBack && (
              <TouchableOpacity style={styles.backButton} onPress={() => stopAllAndNavigate(onBottomBack)}>
                <Ionicons name="arrow-back" size={24} color="red" />
              </TouchableOpacity>
          )}

                {/* Next */}
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
    container: { flex: 1, backgroundColor: 'white', alignItems: 'center', paddingTop: 150 },
    topBackButton: { position: 'absolute', top: 40, left: 20, zIndex: 10, backgroundColor: '#f0f0f0', padding: 12, borderRadius: 24 },
    illustration: { width: 180, height: 180, marginBottom: 10, marginTop: 15 },
    syllablesRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 120, marginTop: 10 },
    syllableContainer: { flexDirection: 'column', alignItems: 'center', marginHorizontal: 8 },
    syllableText: { fontSize: 28, fontWeight: 'bold', color: '#2b2b2b' },
    hyphen: { fontSize: 28, color: '#2b2b2b', marginHorizontal: 4 },
    syllableAudioButton: { backgroundColor: '#2e6ef7', width: 32, height: 32, justifyContent: 'center', alignItems: 'center', borderRadius: 16, marginTop: 4 },
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

        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
        borderColor: '#2e6ef7',
        borderWidth: 1,
        backgroundColor: '#fff',
        width: '100%', // o un valor fijo como 300 si quieres
      },
    soundButton: { backgroundColor: 'white', width: '90%', padding: 16, borderRadius: 8, alignItems: 'center' },
    recordingButton: { backgroundColor: '#FF5252' },
    playButton: { backgroundColor: '#2e6ef7', padding: 16, borderRadius: 12, width: '100%', alignItems: 'center', marginBottom: 20, marginTop: 10 },
    progressBarContainer: { flexDirection: 'row', height: 6, width: '90%', borderRadius: 3, overflow: 'hidden', marginBottom: 50, backgroundColor: '#555' },
    progressFill: {
        height: '100%',
        backgroundColor: '#2e6ef7',
        borderRadius: 3,
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
