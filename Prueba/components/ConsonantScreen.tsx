import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Audio, AVPlaybackSource } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';

type LetterScreenProps = {
    letter: string,
    letterAudio: any,
    practiceAudio: any,
    onNext?: () => void;
    onTopBack?: () => void;
    onBottomBack?: () => void;
};

export default function LetterScreen({
                                         letter,
                                         letterAudio,
                                         practiceAudio,
                                         onNext,
                                         onTopBack,
                                         onBottomBack
                                     }: LetterScreenProps) {
    const [practiceSound, setPracticeSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const pathname = usePathname();
    
    // Define routes where bottom back button should be hidden
    const noBottomBackPaths = [
        '/niveles/nivel1/leccion2/Mm/leccion',
        '/niveles/nivel1/leccion3/Bb/leccion',
        '/niveles/nivel1/leccion4/Ff/leccion',
        '/niveles/nivel1/leccion5/Ll/leccion',
        '/niveles/nivel1/leccion6/Cc/leccion'
    ];

    // Check if current path should hide the bottom back button
    const showBottomBack = !noBottomBackPaths.some(path => pathname.includes(path));

    const playLetterSound = async (file: AVPlaybackSource) => {
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
    
    // Clean up audio on component unmount
    useEffect(() => {
        return () => {
            if (practiceSound) {
                practiceSound.unloadAsync();
            }
        };
    }, [practiceSound]);
   
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.topBackButton}
                onPress={() => stopAudioAndNavigate(onTopBack)}
            >
                <Ionicons name="arrow-back" size={32} color="#242C3B" />
            </TouchableOpacity>

            <Text style={styles.letterText}>{letter}</Text>

            <TouchableOpacity
                style={styles.soundButton}
                onPress={() => playLetterSound(letterAudio)}
            >
                <Ionicons name="volume-high" size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.bottomPanel}>
                <TouchableOpacity
                    style={styles.playButton}
                    onPress={togglePracticeAudio}
                >
                    <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="white" />
                </TouchableOpacity>

                <View style={styles.progressBarContainer}>
                    <View style={styles.progressBarFill} />
                </View>

                <TouchableOpacity
                    style={styles.restartButton}
                    onPress={restartPracticeAudio}
                >
                    <Ionicons name="refresh" size={24} color="white" />
                </TouchableOpacity>

                {showBottomBack && (
                    <TouchableOpacity 
                        style={styles.backButton} 
                        onPress={() => stopAudioAndNavigate(onBottomBack)}
                    >
                        <Ionicons name="arrow-back" size={24} color="red" />
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => stopAudioAndNavigate(onNext)}
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
        backgroundColor: '#242C3B', // ← color azul oscuro
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 200,
    },

    letterText: {
        fontSize: 96,
        fontWeight: 'bold',
        color: 'white', // ← blanco
    },

    soundButton: {
        marginTop: 16,
        backgroundColor: '#2e6ef7',
        padding: 12,
        borderRadius: 8,
    },
    bottomPanel: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
        backgroundColor: '#161a23',
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
    topBackButton: { 
        position: 'absolute',
        top: 35, 
        left: 15, 
        zIndex: 10, 
        backgroundColor: '#f0f0f0', 
        padding: 15, 
        borderRadius: 50 },
    
});