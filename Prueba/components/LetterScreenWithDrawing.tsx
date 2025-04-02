import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { Audio, AVPlaybackSource } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import SignatureScreen from 'react-native-signature-canvas';  // Importamos el componente

type LetterScreenProps = {
    imageSource: any;  // Usamos una imagen en lugar de la letra
    letterAudio: any;
    practiceAudio: any;
};

const screenHeight = Dimensions.get('window').height;

export default function LetterScreenWithDrawing({
                                                    imageSource,
                                                    letterAudio,
                                                    practiceAudio,
                                                }: LetterScreenProps) {
    const [sound, setSound] = useState();

    // Función para reproducir el audio
    const playSound = async (file: AVPlaybackSource) => {
        const { sound } = await Audio.Sound.createAsync(file);
        // @ts-ignore
        setSound(sound);
        await sound.playAsync();
    };

    // Manejar lo que ocurre cuando se guarda el dibujo
    const handleOK = (signature: string) => {
        console.log('Signature saved:', signature); // Aquí obtienes la firma como base64
    };

    // Manejar lo que ocurre cuando se limpia el dibujo
    const handleClear = () => {
        console.log('Signature cleared');
    };

    return (
        <View style={styles.container}>
            {/* Imagen que muestra las instrucciones de la letra */}
            <Image source={imageSource} style={styles.letterImage} />

            {/* Pizarrón para dibujar */}
            <View style={styles.canvasContainer}>
                <SignatureScreen
                    onOK={handleOK}
                    onClear={handleClear}
                    backgroundColor="transparent"
                    // @ts-ignore
                    strokeColor="black"
                    strokeWidth={5}
                    viewMode="portrait"
                />
            </View>

            <View style={styles.bottomPanel}>
                {/* Botón de play con icono de audio */}
                <TouchableOpacity
                    style={styles.playButton}
                    onPress={() => playSound(practiceAudio)}
                >
                    <Ionicons name="volume-high" size={24} color="white" />
                </TouchableOpacity>

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
        justifyContent: 'flex-start',  // Alineamos el contenido al principio
        paddingBottom: 20, // Espacio reducido para el panel inferior
    },
    letterImage: {
        width: '70%', // Reducción de la imagen a un 70% del ancho
        height: screenHeight * 0.2, // Ajustamos el tamaño de la imagen a un 20% de la altura de la pantalla
        marginTop: 40, // Espacio superior
        marginBottom: 20, // Espacio inferior
        resizeMode: 'contain',  // Ajusta la imagen sin deformarla
    },
    soundButton: {
        backgroundColor: '#2e6ef7',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,  // Separación entre botones
    },
    playButton: {
        backgroundColor: '#2e6ef7',
        padding: 16,
        borderRadius: 12,
        width: '80%',  // Hacemos el botón un poco más grande
        alignItems: 'center',
        marginBottom: 16,
    },
    bottomPanel: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,  // Reducción en la altura del panel inferior
        backgroundColor: '#2b2b2b',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 16,
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
    canvasContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '90%',
        marginBottom: 20,
    },
});
