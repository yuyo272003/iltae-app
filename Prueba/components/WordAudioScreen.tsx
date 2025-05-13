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

interface WordItem {
    text: string;
    audio: AVPlaybackSource;
}

interface PracticeWordsScreenProps {
    words: WordItem[];
    practiceAudio: AVPlaybackSource;
    onNext?: () => void;
    onTopBack?: () => void;
    onBottomBack?: () => void;
}

export default function PracticeWordsScreen({
                                                words,
                                                practiceAudio,
                                                onNext,
                                                onTopBack,
                                                onBottomBack,
                                            }: PracticeWordsScreenProps) {
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

    const playWordAudio = async (audio: AVPlaybackSource) => {
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

            {/* Lista de palabras centradas */}
            <View style={styles.wordList}>
                {words.map((item, index) => (
                    <View key={index} style={styles.wordRow}>
                        <Text style={styles.wordText}>{item.text}</Text>
                        <TouchableOpacity style={styles.wordAudioButton} onPress={() => playWordAudio(item.audio)}>
                            <Ionicons name="volume-high" size={22} color="white" />
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
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 60,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    topBackButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        backgroundColor: '#f0f0f0',
        padding: 12,
        borderRadius: 24,
    },
    wordList: {
        width: '100%',
        paddingTop: 50,
        paddingBottom: 40,
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wordRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 24,
        width: '80%',
    },
    wordText: {
        fontSize: 44,
        fontWeight: 'bold',
        color: '#2b2b2b',
    },
    wordAudioButton: {
        backgroundColor: '#2e6ef7',
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomPanel: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 240, backgroundColor: '#2b2b2b', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, alignItems: 'center' },
    playButton: { backgroundColor: '#2e6ef7', padding: 14, borderRadius: 12, width: '90%', alignItems: 'center', marginBottom: 12 },
    progressBarContainer: { height: 6, backgroundColor: '#ccc', width: '90%', borderRadius: 3, marginBottom: 24 },
    progressBarFill: { height: '100%', backgroundColor: '#2e6ef7', borderRadius: 3 },
    restartButton: { position: 'absolute', bottom: 40, backgroundColor: '#2e6ef7', borderRadius: 50, padding: 16, alignSelf: 'center' },
    backButton: { position: 'absolute', left: 30, bottom: 40, backgroundColor: '#ffffff', borderRadius: 50, padding: 20 },
    nextButton: { position: 'absolute', right: 30, bottom: 40, backgroundColor: '#33cc66', borderRadius: 50, padding: 20 },
});
