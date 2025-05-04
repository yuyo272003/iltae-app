import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, router } from 'expo-router';
import { playAudioGlobal, stopAudioGlobal } from '@/utils/AudioManager';
import { avanzarLeccion } from '@/utils/leassonProgress';

// Utilidad para mezclar el array
function shuffleArray<T>(array: T[]): T[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// Definir el tipo de las propiedades que va a recibir este componente
interface SyllableMatchGameProps {
    syllables: { syllable: string; file: any }[]; // Lista de sílabas y archivos de audio
    instructionAudio: any; // Audio de instrucción
    onTopBack: () => void; // Función para la acción de "back" superior
    onBottomBack: () => void; // Función para la acción de "back" inferior
    onNext: () => void; // Función para la acción de "next"
}

export const SyllableMatchGame: React.FC<SyllableMatchGameProps> = ({ syllables, instructionAudio, onTopBack, onBottomBack, onNext }) => {
    const [soundButtons, setSoundButtons] = useState<any[]>([]);
    const [letterButtons, setLetterButtons] = useState<any[]>([]);
    const [matchedSyllables, setMatchedSyllables] = useState<string[]>([]);
    const [selectedSound, setSelectedSound] = useState<{ syllable: string } | null>(null);

    useFocusEffect(
        React.useCallback(() => {
            setSoundButtons(shuffleArray(syllables).map((item, index) => ({
                ...item,
                id: index,
            })));

            setLetterButtons(shuffleArray(syllables).map((item, index) => ({
                syllable: item.syllable,
                id: index,
            })));

            setMatchedSyllables([]);
            setSelectedSound(null);
            stopAudioGlobal();

            return () => {
                stopAudioGlobal();
            };
        }, [syllables])
    );

    const handlePlaySound = async (button: { syllable: string; file: any }) => {
        await playAudioGlobal(button.file);
        setSelectedSound({ syllable: button.syllable });
    };

    const handleSelectLetter = async (button: { syllable: string }) => {
        if (!selectedSound) return;

        if (selectedSound.syllable === button.syllable) {
            setMatchedSyllables((prev) => [...prev, button.syllable]);
        }

        setSelectedSound(null);
    };

    const handlePlayInstruction = async () => {
        await playAudioGlobal(instructionAudio);
    };

    const allMatched = matchedSyllables.length === syllables.length;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={async () => {
                    await stopAudioGlobal();
                    onTopBack(); // Usar la función proporcionada para la navegación
                }}
            >
                <Ionicons name="arrow-back" size={28} color="#2e6ef7" />
            </TouchableOpacity>

            <View style={styles.matchContainer}>
                <View style={styles.column}>
                    {soundButtons.map((button) => (
                        <TouchableOpacity
                            key={`sound-${button.id}`}
                            style={[
                                styles.soundButton,
                                matchedSyllables.includes(button.syllable) && styles.correctMatch,
                            ]}
                            onPress={() => handlePlaySound(button)}
                            disabled={matchedSyllables.includes(button.syllable)}
                        >
                            <Ionicons name="volume-high" size={24} color="blue" />
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.column}>
                    {letterButtons.map((button) => (
                        <TouchableOpacity
                            key={`letter-${button.id}`}
                            style={[
                                styles.letterButton,
                                matchedSyllables.includes(button.syllable) && styles.correctMatch,
                            ]}
                            onPress={() => handleSelectLetter(button)}
                            disabled={matchedSyllables.includes(button.syllable)}
                        >
                            <Text style={styles.syllableText}>
                                {button.syllable}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.bottomBox}>
                <TouchableOpacity style={styles.playInstruction} onPress={handlePlayInstruction}>
                    <Ionicons name="play" size={28} color="white" />
                </TouchableOpacity>

                <View style={styles.progressBar}>
                    <View
                        style={[
                            styles.progressFill,
                            { width: `${(matchedSyllables.length / syllables.length) * 100}%` },
                        ]}
                    />
                </View>

                <View style={styles.navButtons}>
                    <TouchableOpacity
                        style={styles.backRoundButton}
                        onPress={async () => {
                            await stopAudioGlobal();
                            onBottomBack(); // Usar la función proporcionada para la acción de "back" inferior
                        }}
                    >
                        <Ionicons name="arrow-back" size={24} color="red" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.nextButton,
                            { backgroundColor: allMatched ? '#00c853' : '#aaa' },
                        ]}
                        disabled={!allMatched}
                        onPress={async () => {
                            await stopAudioGlobal();
                            onNext(); // Usar la función proporcionada para la acción de "next"
                        }}
                    >
                        <Ionicons name="arrow-forward" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
        padding: 14,
        borderRadius: 50,
        elevation: 5,
    },
    matchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 80,
        marginBottom: 140,
    },
    column: {
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
    },
    soundButton: {
        width: 100,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    letterButton: {
        width: 100,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    correctMatch: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    syllableText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    bottomBox: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
        backgroundColor: '#1D2233',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        alignItems: 'center',
        elevation: 10,
    },
    playInstruction: {
        backgroundColor: '#2e6ef7',
        padding: 14,
        borderRadius: 12,
        width: '90%',
        alignItems: 'center',
        marginBottom: 12,
    },

    progressBar: {
        width: '80%',
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 20,
    },
    progressFill: {
        height: 5,
        backgroundColor: '#000',
    },
    navButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        marginTop: 10,
    },
    backRoundButton: {
        width: 50,
        height: 50,
        backgroundColor: '#ffffff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
