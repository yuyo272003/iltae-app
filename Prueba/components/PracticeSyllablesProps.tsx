import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Audio, AVPlaybackSource } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import {
    playAudioGlobal,
    stopAudioGlobal,
    registerStatusCallback,
    unregisterStatusCallback,
    isAudioPlayingGlobal,
} from '@/utils/AudioManager';

// Tipado de sílabas
interface Syllable {
    text: string;
    audio: AVPlaybackSource;
}

interface PracticeSyllablesScreenProps {
    syllables: Syllable[];
    practiceAudio: AVPlaybackSource;
    onNext?: () => void;
    onTopBack?: () => void;
    onBottomBack?: () => void;
}

export default function PracticeSyllablesScreen({
                                                    syllables,
                                                    practiceAudio,
                                                    onNext,
                                                    onTopBack,
                                                    onBottomBack,
                                                }: PracticeSyllablesScreenProps) {
    const router = useRouter();
    const pathname = usePathname();

    const [currentSound, setCurrentSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(isAudioPlayingGlobal());

    useEffect(() => {
        const statusCb = (playing: boolean) => setIsPlaying(playing);
        registerStatusCallback(statusCb);
        return () => {
            stopAudioGlobal();
            unregisterStatusCallback(statusCb);
            if (currentSound) currentSound.unloadAsync();
        };
    }, []);

    const playSyllableAudio = async (audio: AVPlaybackSource) => {
        stopAudioGlobal();
        if (currentSound) {
            await currentSound.stopAsync();
            await currentSound.unloadAsync();
        }
        const { sound } = await Audio.Sound.createAsync(audio);
        setCurrentSound(sound);
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate(status => {
            if (status.isLoaded && status.didJustFinish) {
                sound.unloadAsync();
                setCurrentSound(null);
            }
        });
    };

    const togglePracticeAudio = () => {
        if (currentSound) {
            currentSound.stopAsync();
            currentSound.unloadAsync();
            setCurrentSound(null);
        }
        playAudioGlobal(practiceAudio);
    };

    const restartPracticeAudio = () => {
        if (currentSound) {
            currentSound.stopAsync();
            currentSound.unloadAsync();
            setCurrentSound(null);
        }
        stopAudioGlobal();
        playAudioGlobal(practiceAudio);
    };

    const handleNav = (fn?: () => void) => {
        stopAudioGlobal();
        if (currentSound) {
            currentSound.stopAsync();
            currentSound.unloadAsync();
            setCurrentSound(null);
        }
        fn?.();
    };

    const showBottomBack = pathname !== '/niveles/nivel2/leccion1/Bpractice';

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.topBackButton} onPress={() => handleNav(onTopBack)}>
                <Ionicons name="arrow-back" size={32} color="#2b2b2b" />
            </TouchableOpacity>

            {/* Sílabas más abajo visualmente */}
            <View style={styles.syllablesContainer}>
                {syllables.map((item, index) => (
                    <View key={index} style={styles.syllableBlock}>
                        <Text style={styles.syllableText}>{item.text}</Text>
                        <TouchableOpacity style={styles.audioButton} onPress={() => playSyllableAudio(item.audio)}>
                            <Ionicons name="volume-high" size={20} color="#2e6ef7" />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            {/* Panel inferior */}
            <View style={styles.bottomPanel}>
                <TouchableOpacity style={styles.playButton} onPress={togglePracticeAudio}>
                    <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="white" />
                </TouchableOpacity>

                <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBarFill, isPlaying ? { width: '50%' } : { width: 0 }]} />
                </View>

                {/* Botón de reiniciar */}
                <TouchableOpacity style={styles.restartButton} onPress={restartPracticeAudio}>
                    <Ionicons name="refresh" size={24} color="white" />
                </TouchableOpacity>

                {showBottomBack && (
                    <TouchableOpacity style={styles.backButton} onPress={() => handleNav(onBottomBack)}>
                        <Ionicons name="arrow-back" size={24} color="red" />
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.nextButton} onPress={() => handleNav(onNext)}>
                    <Ionicons name="arrow-forward" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1D2233', paddingTop: 60, alignItems: 'center' },
    topBackButton: { position: 'absolute', top: 40, left: 20, backgroundColor: '#f0f0f0', padding: 12, borderRadius: 24 },
    syllablesContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 100, marginBottom: 100, gap: 10 },
    syllableBlock: { alignItems: 'center', marginHorizontal: 8 },
    syllableText: { fontSize: 28, fontWeight: 'bold', color: '#2b2b2b', backgroundColor: '#ffffff', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10 },
    audioButton: { marginTop: 6, width: 30, height: 30, borderRadius: 15, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' },
    bottomPanel: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 240, backgroundColor: '#2b2b2b', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, alignItems: 'center' },
    playButton: { backgroundColor: '#2e6ef7', padding: 14, borderRadius: 12, width: '90%', alignItems: 'center', marginBottom: 12 },
    progressBarContainer: { height: 6, backgroundColor: '#ccc', width: '90%', borderRadius: 3, marginBottom: 24 },
    progressBarFill: { height: '100%', backgroundColor: '#2e6ef7', borderRadius: 3 },
    restartButton: { position: 'absolute', bottom: 40, backgroundColor: '#2e6ef7', borderRadius: 50, padding: 16, alignSelf: 'center' },
    backButton: { position: 'absolute', left: 30, bottom: 40, backgroundColor: '#ffffff', borderRadius: 50, padding: 20 },
    nextButton: { position: 'absolute', right: 30, bottom: 40, backgroundColor: '#33cc66', borderRadius: 50, padding: 20 },
});
