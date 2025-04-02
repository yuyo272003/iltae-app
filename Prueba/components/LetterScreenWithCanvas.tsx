import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Audio, AVPlaybackSource } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { Canvas } from '@benjeau/react-native-draw';  // Correcto import

type LetterScreenProps = {
    letter: string;
    letterAudio: any;
    practiceAudio: any;
};

const screenHeight = Dimensions.get('window').height;

export default function LetterScreenWithDrawing({
                                                    letter,
                                                    letterAudio,
                                                    practiceAudio,
                                                }: LetterScreenProps) {
    const [sound, setSound] = useState();

    // Usamos useRef para manejar el Canvas
    const canvasRef = useRef(null);

    const playSound = async (file: AVPlaybackSource) => {
        const { sound } = await Audio.Sound.createAsync(file);
        // @ts-ignore
        setSound(sound);
        await sound.playAsync();
    };

    return (
        <View style={styles.container}>
            {/* Letra principal */}
            <Text style={styles.letterText}>{letter}</Text>

            {/* Pizarrón para dibujar */}
            <Canvas
                ref={canvasRef} // Usamos useRef aquí
                style={styles.canvas}
                // @ts-ignore
                strokeColor="black"
                strokeWidth={5}
                contentWidth={Dimensions.get('window').width * 0.9} // Ajusta el tamaño
                contentHeight={screenHeight * 0.5} // Ajusta el tamaño
                scrollEnabled={false}  // Desactivar desplazamiento
            />

            {/* Botón de bocina para audio de la letra */}
            <TouchableOpacity
                style={styles.soundButton}
                onPress={() => playSound(letterAudio)}
            >
                <Ionicons name="volume-high" size={24} color="white" />
            </TouchableOpacity>

            {/* Botón de Play para practicar la letra */}
            <TouchableOpacity
                style={styles.playButton}
                onPress={() => playSound(practiceAudio)}
            >
                <Ionicons name="play" size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.bottomPanel}>
                {/* Barra de progreso */}
                <View style={styles.progressBarContainer}>
                    <View style={styles.progressBarFill} />
                </View>

                {/* Botón de siguiente */}
                <TouchableOpacity style={styles.nextButton}>
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
        paddingBottom: 200, // Espacio para el panel inferior
    },
    letterText: {
        fontSize: 96,
        fontWeight: 'bold',
        color: '#2b2b2b',
    },
    soundButton: {
        marginTop: 16,
        backgroundColor: '#2e6ef7',
        padding: 12,
        borderRadius: 8,
    },
    playButton: {
        backgroundColor: '#2e6ef7',
        padding: 16,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        marginBottom: 16,
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
    nextButton: {
        position: 'absolute',
        right: 24,
        bottom: 24,
        backgroundColor: '#33cc66',
        borderRadius: 50,
        padding: 16,
    },
    canvas: {
        backgroundColor: 'white',
        width: '90%',
        height: screenHeight * 0.5, // Ajusta el tamaño del área para dibujar
        borderRadius: 10,
        borderColor: '#2b2b2b',
        borderWidth: 2,
        marginBottom: 20,
        overflow: 'hidden',  // Asegura que el dibujo no se salga del área
    },
});