import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Audio, AVPlaybackSource } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

type SyllableScreenProps = {
    letter: string;
    syllables: string[];
    syllablesAudio: AVPlaybackSource;
    practiceAudio: AVPlaybackSource;
    onNext?: () => void;
    onBack?: () => void;
    onTopBack?: () => void;
};

export default function SyllableScreen({
                                           letter,
                                           syllables,
                                           syllablesAudio,
                                           practiceAudio,
                                           onNext,
                                           onBack,
                                           onTopBack,
                                       }: SyllableScreenProps) {
    const [practiceSound, setPracticeSound] = useState<Audio.Sound | null>(null);
    const [syllableSound, setSyllableSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const playSyllablesAudio = async () => {
        if (syllableSound) {
            await syllableSound.replayAsync();
        } else {
            const { sound } = await Audio.Sound.createAsync(syllablesAudio);
            setSyllableSound(sound);
            await sound.playAsync();
        }
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

    const stopAudioAndNavigate = async (fn?: () => void) => {
        if (practiceSound) {
            await practiceSound.stopAsync();
            await practiceSound.unloadAsync();
            setPracticeSound(null);
        }
        if (syllableSound) {
            await syllableSound.stopAsync();
            await syllableSound.unloadAsync();
            setSyllableSound(null);
        }
        setIsPlaying(false);
        setIsPaused(false);
        fn?.();
    };

    return (
        <View style={styles.container}>
            {/* Botón de regreso superior */}
            <TouchableOpacity
                style={styles.topBackButton}
                onPress={() => stopAudioAndNavigate(onTopBack)}
            >
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            {/* Flechas y sílabas */}
            <View style={styles.syllableDiagram}>
                <View style={styles.leftColumn}>
                    <Text style={styles.letter}>{letter}</Text>
                </View>

                <View style={styles.rightColumn}>
                    {syllables.map((syllable, idx) => {
                        const arrowRotations = ['-25deg', '-10deg', '0deg', '10deg', '25deg'];
                        return (
                            <View key={idx} style={styles.row}>
                                <Ionicons
                                    name="arrow-forward"
                                    size={28}
                                    style={[styles.arrowIcon, { transform: [{ rotate: arrowRotations[idx] }] }]}
                                />

                                <Text style={styles.syllableText}>{syllable}</Text>
                            </View>
                        );
                    })}
                </View>
            </View>


            {/* Botón de audio para las sílabas */}
            <TouchableOpacity style={styles.soundButton} onPress={playSyllablesAudio}>
                <Ionicons name="volume-high" size={24} color="white" />
            </TouchableOpacity>

            {/* Panel inferior */}
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

                <TouchableOpacity style={styles.backButton} onPress={() => stopAudioAndNavigate(onBack)}>
                    <Ionicons name="arrow-back" size={24} color="red" />
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
        justifyContent: 'flex-start',
        paddingTop: 100,
        paddingBottom: 180,
    },
    topBackButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
        backgroundColor: '#2e2e2e',
        padding: 12,
        borderRadius: 30,
        elevation: 5,
    },
    syllableDiagram: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        paddingHorizontal: 16,
        gap: 20,
    },
    leftColumn: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightColumn: {
        justifyContent: 'space-between',
        gap: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
    },
    arrowIcon: {
        marginRight: 16,
        color: '#000',
    },

    syllableText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
    },
    letter: {
        fontSize: 80,
        fontWeight: 'bold',
        color: '#000',
    },
    soundButton: {
        marginTop: 24,
        backgroundColor: '#2e6ef7',
        padding: 14,
        borderRadius: 10,
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
});
