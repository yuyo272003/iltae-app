import React, { useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Audio, AVPlaybackSource } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

// 🎯 Nuevo componente: muestra 4 imágenes + 4 sonidos individuales + audio general inferior

export type ImageAudioScreenProps = {
    images: { src: any; audio: AVPlaybackSource }[];
    practiceAudio: AVPlaybackSource;
    onNext?: () => void;
    onTopBack?: () => void;
    onBottomBack?: () => void;
};

export default function ImageAudioScreen({
                                             images,
                                             practiceAudio,
                                             onNext,
                                             onTopBack,
                                             onBottomBack,
                                         }: ImageAudioScreenProps) {
    const [practiceSound, setPracticeSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const playImageSound = async (file: AVPlaybackSource) => {
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
                if (status.isLoaded && status.didJustFinish) {
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

    const stopAudioAndNavigate = async (navigationFn?: () => void) => {
        if (practiceSound) {
            await practiceSound.stopAsync();
            await practiceSound.unloadAsync();
            setPracticeSound(null);
        }
        setIsPlaying(false);
        setIsPaused(false);
        navigationFn?.();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.topBackButton}
                onPress={() => stopAudioAndNavigate(onTopBack)}
            >
                <Ionicons name="arrow-back" size={32} color="#2b2b2b" />
            </TouchableOpacity>

            <View style={styles.grid}>
                {images.map((item, idx) => (
                    <View key={idx} style={styles.imageWrapper}>
                        <Image source={item.src} style={styles.image} resizeMode="contain" />
                        <TouchableOpacity onPress={() => playImageSound(item.audio)} style={styles.iconButton}>
                            <Ionicons name="volume-high" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            <View style={styles.bottomPanel}>
                <TouchableOpacity style={styles.playButton} onPress={togglePracticeAudio}>
                    <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="white" />
                </TouchableOpacity>

                <View style={styles.progressBarContainer}>
                    <View style={styles.progressBarFill} />
                </View>

                <TouchableOpacity style={styles.restartButton} onPress={restartPracticeAudio}>
                    <Ionicons name="refresh" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.backButton} onPress={() => stopAudioAndNavigate(onBottomBack)}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.nextButton} onPress={() => stopAudioAndNavigate(onNext)}>
                    <Ionicons name="arrow-forward" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 200,
    },
    topBackButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
        backgroundColor: '#e0e0e0',
        padding: 14,
        borderRadius: 50,
        elevation: 5,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 32,
        marginTop: -10,
    },
    imageWrapper: {
        alignItems: 'center',
        width: 140,
        marginVertical: 20,
    },
    image: {
        width: 150,
        height: 120,
    },
    iconButton: {
        marginTop: 8,
        backgroundColor: '#2b2b2b',
        padding: 10,
        borderRadius: 8,
    },
    bottomPanel: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 300,
        backgroundColor: '#2b2b2b',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        alignItems: 'center',
        elevation: 10,
    },
    playButton: {
        backgroundColor: '#2e6ef7',
        padding: 16,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        marginBottom: 16,
    },
    progressBarContainer: {
        height: 6,
        backgroundColor: '#ccc',
        width: '90%',
        borderRadius: 3,
        marginBottom: 16,
    },
    progressBarFill: {
        width: '50%',
        height: '100%',
        backgroundColor: '#2e6ef7',
        borderRadius: 3,
    },
    restartButton: {
        position: 'absolute',
        bottom: 70,
        backgroundColor: '#2e6ef7',
        borderRadius: 50,
        padding: 16,
        alignSelf: 'center',
    },
    nextButton: {
        position: 'absolute',
        right: 30,
        bottom: 70,
        backgroundColor: '#33cc66',
        borderRadius: 50,
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        left: 30,
        bottom: 70,
        backgroundColor: '#ff6666',
        borderRadius: 50,
        padding: 20,
    },
});
