import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {router} from "expo-router";

const sounds = [
    { id: 0, vowel: 'A', file: require('@assets/audio/lecciones/nivel1/lessons/E/e.wav') },
    { id: 1, vowel: 'E', file: require('@assets/audio/lecciones/nivel1/lessons/E/e.wav') },
    { id: 2, vowel: 'I', file: require('@assets/audio/lecciones/nivel1/lessons/E/e.wav') },
    { id: 3, vowel: 'O', file: require('@assets/audio/lecciones/nivel1/lessons/E/e.wav') },
    { id: 4, vowel: 'U', file: require('@assets/audio/lecciones/nivel1/lessons/E/e.wav') },
];

export default function VowelMatchGame() {
    const navigation = useNavigation();
    const [selectedSoundId, setSelectedSoundId] = useState<number | null>(null);
    const [matchedPairs, setMatchedPairs] = useState<{ [key: number]: boolean }>({});
    const [instructionAudio] = useState(require('@assets/audio/lecciones/nivel1/lessons/E/e.wav'));

    const handlePlaySound = async (id: number) => {
        const { sound } = await Audio.Sound.createAsync(sounds[id].file);
        await sound.playAsync();
        setSelectedSoundId(id);
    };

    const handleSelectVowel = (vowel: string) => {
        if (selectedSoundId === null) return;

        const selectedSound = sounds.find((s) => s.id === selectedSoundId);
        if (selectedSound && selectedSound.vowel === vowel) {
            setMatchedPairs((prev) => ({ ...prev, [selectedSoundId]: true }));
            setSelectedSoundId(null);
        } else {
            Alert.alert('Intenta de nuevo', 'Esa vocal no corresponde al sonido.');
            setSelectedSoundId(null);
        }
    };

    const allMatched = Object.keys(matchedPairs).length === sounds.length;

    const handlePlayInstruction = async () => {
        const { sound } = await Audio.Sound.createAsync(instructionAudio);
        await sound.playAsync();
    };


    // @ts-ignore
    return (
        <View style={styles.container}>
            {/* Botón de regreso */}

            <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/Level1Screen')}>
                <Ionicons name="arrow-back" size={28} color="black" />
            </TouchableOpacity>

            {/* Parte central: audio + vocal */}
            <View style={styles.pairsContainer}>
                {sounds.map((sound) => (
                    <View key={sound.id} style={styles.row}>
                        <TouchableOpacity
                            style={[
                                styles.audioButton,
                                matchedPairs[sound.id] && styles.correctMatch,
                            ]}
                            onPress={() => handlePlaySound(sound.id)}
                            disabled={matchedPairs[sound.id]}
                        >
                            <Ionicons name="volume-high" size={24} color="blue" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.vowelButton,
                                matchedPairs[sound.id] && styles.correctMatch,
                            ]}
                            onPress={() => handleSelectVowel(sound.vowel)}
                            disabled={matchedPairs[sound.id]}
                        >
                            <Text style={styles.vowelText}>
                                {sound.vowel.toUpperCase() + sound.vowel.toLowerCase()}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            {/* Parte inferior */}
            <View style={styles.bottomBox}>
                {/* Botón de instrucciones */}
                <TouchableOpacity style={styles.playInstruction} onPress={handlePlayInstruction}>
                    <Ionicons name="play" size={28} color="blue" />
                </TouchableOpacity>

                {/* Barra de progreso */}
                <View style={styles.progressBar}>
                    <View
                        style={[
                            styles.progressFill,
                            { width: `${(Object.keys(matchedPairs).length / sounds.length) * 100}%` },
                        ]}
                    />
                </View>

                {/* Botones de navegación */}
                <View style={styles.navButtons}>
                    <TouchableOpacity
                        style={styles.backRoundButton}
                        onPress={() => router.push('/(tabs)/niveles/nivel1/leccion1/Uboard')}
                    >
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.nextButton,
                            { backgroundColor: allMatched ? '#00c853' : '#aaa' },
                        ]}
                        disabled={!allMatched}
                        onPress={() => Alert.alert('¡Bien hecho!', 'Completaste todos los pares.')}
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
        zIndex: 10,
    },
    pairsContainer: {
        marginTop: 40,
        paddingHorizontal: 30,
        marginBottom: 140,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    audioButton: {
        width: 100,
        height: 40,
        borderRadius: 20,
        borderColor: 'blue',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    vowelButton: {
        width: 100,
        height: 40,
        borderRadius: 20,
        borderColor: 'blue',
        borderWidth: 2,
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
        padding: 10,
        borderRadius: 12,
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
    nextButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
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

});
