import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export type ImageAudioScreenProps = {
    images: { src: any; audio: any }[];
    practiceAudio: any;
    title?: string;
    onNext?: () => void;
    onTopBack?: () => void;
    onBottomBack?: () => void;
};

export default function PracticeImageAudioScreen({
    images,
    practiceAudio,
    title = 'Mm',
    onNext,
    onTopBack,
    onBottomBack,
}: ImageAudioScreenProps) {
    const [practiceSound, setPracticeSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const playImageSound = async (file: any) => {
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

            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity
                onPress={() => playImageSound(require('@/assets/audio/letra_m.wav'))}
                style={styles.titleAudio}
            >
                <Ionicons name="volume-high" size={20} color="white" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.grid}>
                {images.map((item, idx) => (
                    <View key={idx} style={styles.imageBox}>
                        <Image source={item.src} style={styles.image} resizeMode="contain" />
                        <TouchableOpacity
                            onPress={() => playImageSound(item.audio)}
                            style={styles.iconButton}
                        >
                            <Ionicons name="volume-high" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

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
        backgroundColor: '#11192C',
        paddingTop: 60,
        paddingHorizontal: 20,
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
    title: {
        fontSize: 64,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titleAudio: {
        alignSelf: 'center',
        marginVertical: 10,
        backgroundColor: '#2e6ef7',
        borderRadius: 12,
        padding: 6,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingBottom: 20,
    },
    imageBox: {
        width: '46%',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 10,
        marginBottom: 12,
        alignItems: 'center',
    },
    image: {
        width: 70,
        height: 70,
    },
    iconButton: {
        marginTop: 6,
        backgroundColor: '#2e6ef7',
        borderRadius: 12,
        padding: 6,
    },
    bottomPanel: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#1A2238',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        alignItems: 'center',
    },
    playButton: {
        backgroundColor: '#2e6ef7',
        padding: 14,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginBottom: 12,
    },
    progressBarContainer: {
        height: 6,
        backgroundColor: '#ccc',
        width: '90%',
        borderRadius: 3,
        marginBottom: 12,
    },
    progressBarFill: {
        width: '30%',
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