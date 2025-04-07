import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, router } from 'expo-router';
import { playAudioGlobal, stopAudioGlobal } from '@/utils/AudioManager';

function shuffleArray<T>(array: T[]): T[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

const originalPairs = [
    { vowel: 'A', file: require('@assets/audio/lecciones/nivel1/lessons/A/A2.wav') },
    { vowel: 'E', file: require('@assets/audio/lecciones/nivel1/lessons/E/e2.wav') },
    { vowel: 'I', file: require('@assets/audio/lecciones/nivel1/lessons/I/i.wav') },
    { vowel: 'O', file: require('@assets/audio/lecciones/nivel1/lessons/O/o.wav') },
    { vowel: 'U', file: require('@assets/audio/lecciones/nivel1/lessons/U/u.wav') },
];

export default function VowelMatchGame() {
    const [instructionAudio] = useState(require('@assets/audio/lecciones/nivel1/actividad.wav'));

    const [soundButtons, setSoundButtons] = useState<any[]>([]);
    const [letterButtons, setLetterButtons] = useState<any[]>([]);
    const [matchedVowels, setMatchedVowels] = useState<string[]>([]);
    const [selectedSound, setSelectedSound] = useState<{ vowel: string } | null>(null);

    useFocusEffect(
        React.useCallback(() => {
            // Reiniciar todos los estados al entrar
            setSoundButtons(
                shuffleArray(originalPairs).map((item, index) => ({
                    ...item,
                    id: index,
                }))
            );

            setLetterButtons(
                shuffleArray(originalPairs).map((item, index) => ({
                    vowel: item.vowel,
                    id: index,
                }))
            );

            setMatchedVowels([]);
            setSelectedSound(null);
            stopAudioGlobal();

            // También puedes reproducir la instrucción al entrar automáticamente:
            // playAudioGlobal(instructionAudio);

            return () => {
                stopAudioGlobal();
            };
        }, [])
    );

    const handlePlaySound = async (button: { vowel: string; file: any }) => {
        await playAudioGlobal(button.file);
        setSelectedSound({ vowel: button.vowel });
    };

    const handleSelectLetter = async (button: { vowel: string }) => {
        if (!selectedSound) return;

        if (selectedSound.vowel === button.vowel) {
            setMatchedVowels((prev) => [...prev, button.vowel]);
        }

        setSelectedSound(null);
    };

    const handlePlayInstruction = async () => {
        await playAudioGlobal(instructionAudio);
    };

    const allMatched = matchedVowels.length === originalPairs.length;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={async () => {
                    await stopAudioGlobal();
                    router.push('/(tabs)/Level1Screen');
                }}
            >
                <Ionicons name="arrow-back" size={28} color="black" />
            </TouchableOpacity>

            <View style={styles.matchContainer}>
                <View style={styles.column}>
                    {soundButtons.map((button) => (
                        <TouchableOpacity
                            key={`sound-${button.id}`}
                            style={[
                                styles.soundButton,
                                matchedVowels.includes(button.vowel) && styles.correctMatch,
                            ]}
                            onPress={() => handlePlaySound(button)}
                            disabled={matchedVowels.includes(button.vowel)}
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
                                matchedVowels.includes(button.vowel) && styles.correctMatch,
                            ]}
                            onPress={() => handleSelectLetter(button)}
                            disabled={matchedVowels.includes(button.vowel)}
                        >
                            <Text style={styles.vowelText}>
                                {button.vowel.toUpperCase() + button.vowel.toLowerCase()}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.bottomBox}>
                <TouchableOpacity style={styles.playInstruction} onPress={handlePlayInstruction}>
                    <Ionicons name="play" size={28} color="blue" />
                </TouchableOpacity>

                <View style={styles.progressBar}>
                    <View
                        style={[
                            styles.progressFill,
                            { width: `${(matchedVowels.length / originalPairs.length) * 100}%` },
                        ]}
                    />
                </View>

                <View style={styles.navButtons}>
                    <TouchableOpacity
                        style={styles.backRoundButton}
                        onPress={async () => {
                            await stopAudioGlobal();
                            router.push('/(tabs)/niveles/nivel1/leccion1/Uboard');
                        }}
                    >
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.nextButton,
                            { backgroundColor: allMatched ? '#00c853' : '#aaa' },
                        ]}
                        disabled={!allMatched}
                        onPress={async () => {
                            await stopAudioGlobal();
                            // @ts-ignore
                            router.push('/(tabs)//Level1Screen');
                        }}
                    >
                        <Ionicons name="arrow-forward" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
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
        backgroundColor: '#e0e0e0',
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
        borderColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    correctMatch: {
        backgroundColor: '#b9fbc0',
        borderColor: '#00c853',
    },
    vowelText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    bottomBox: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#007bff',
        paddingVertical: 25,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
    },
    playInstruction: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 140, // más ancho
        borderRadius: 12,
        marginBottom: 12,
        alignItems: 'center',
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
        backgroundColor: '#ff5252',
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
