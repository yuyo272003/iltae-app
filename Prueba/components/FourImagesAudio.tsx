import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio, AVPlaybackSource } from 'expo-av';
import { router } from 'expo-router';
import {
    playAudioGlobal,
    stopAudioGlobal,
    registerStatusCallback,
    unregisterStatusCallback,
    isAudioPlayingGlobal,
} from '@/utils/AudioManager';

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
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentImageSound, setCurrentImageSound] = useState<Audio.Sound | null>(null);

    useEffect(() => {
        const statusCb = (playing: boolean) => setIsPlaying(playing);
        registerStatusCallback(statusCb);
        setIsPlaying(isAudioPlayingGlobal());
        return () => {
            stopAudioGlobal();
            unregisterStatusCallback(statusCb);
            if (currentImageSound) {
                currentImageSound.unloadAsync();
            }
        };
    }, [currentImageSound]);

    const playImageSound = async (file: AVPlaybackSource) => {
        // stop any practice audio
        stopAudioGlobal();
        setIsPlaying(false);
        // unload previous image sound
        if (currentImageSound) {
            await currentImageSound.stopAsync();
            await currentImageSound.unloadAsync();
            setCurrentImageSound(null);
        }
        const { sound } = await Audio.Sound.createAsync(file);
        setCurrentImageSound(sound);
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate(status => {
            if (status.isLoaded && status.didJustFinish) {
                sound.unloadAsync();
                setCurrentImageSound(null);
            }
        });
    };

    const togglePracticeAudio = () => {
        // stop any image audio
        if (currentImageSound) {
            currentImageSound.stopAsync();
            currentImageSound.unloadAsync();
            setCurrentImageSound(null);
        }
        playAudioGlobal(practiceAudio);
    };

    const restartPracticeAudio = () => {
        // stop image and practice
        if (currentImageSound) {
            currentImageSound.stopAsync();
            currentImageSound.unloadAsync();
            setCurrentImageSound(null);
        }
        stopAudioGlobal();
        playAudioGlobal(practiceAudio);
    };

    const handleNavigation = (fn?: () => void) => {
        // stop all audio
        stopAudioGlobal();
        if (currentImageSound) {
            currentImageSound.stopAsync();
            currentImageSound.unloadAsync();
            setCurrentImageSound(null);
        }
        fn?.();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.topBackButton}
                onPress={() => handleNavigation(onTopBack)}
            >
                <Ionicons name="arrow-back" size={32} color="white" />
            </TouchableOpacity>

            <View style={styles.grid}>
                {images.map((item, idx) => (
                    <View key={idx} style={styles.imageWrapper}>
                        <Image
                            source={item.src}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <TouchableOpacity
                            onPress={() => playImageSound(item.audio)}
                            style={styles.iconButton}
                        >
                            <Ionicons name="volume-high" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            <View style={styles.bottomPanel}>
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

                <View style={styles.progressBarContainer}>
                    <View style={[
                        styles.progressBarFill,
                        isPlaying ? { width: '50%' } : { width: 0 }
                    ]} />
                </View>

                <TouchableOpacity
                    style={styles.restartButton}
                    onPress={restartPracticeAudio}
                >
                    <Ionicons name="refresh" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => handleNavigation(onBottomBack)}
                >
                    <Ionicons name="arrow-back" size={24} color="red" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => handleNavigation(onNext)}
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
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 120,
    },
    topBackButton: { 
        position: 'absolute',
        top: 35, 
        left: 15, 
        zIndex: 10, 
        backgroundColor: '#242C3B', 
        padding: 15, 
        borderRadius: 50 },
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
        backgroundColor: '#242C3B',
        padding: 8,
        borderRadius: 9,
    },
    bottomPanel: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
        backgroundColor: '#242C3B',
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
