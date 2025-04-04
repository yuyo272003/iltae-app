import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { Audio, AVPlaybackSource } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import SignatureScreen from 'react-native-signature-canvas';
import { SafeAreaView } from 'react-native-safe-area-context';

type LetterScreenProps = {
    imageSource: any;
    letterAudio: any;
    practiceAudio: any;
    onNext?: () => void;
    onTopBack?: () => void;
    onBottomBack?: () => void;
};

const screenHeight = Dimensions.get('window').height;

export default function LetterScreenWithDrawing({
                                                    imageSource,
                                                    letterAudio,
                                                    practiceAudio,
                                                    onNext,
                                                    onTopBack,
                                                    onBottomBack,
                                                }: LetterScreenProps) {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const togglePracticeAudio = async () => {
        if (sound && isPlaying) {
            await sound.pauseAsync();
            setIsPlaying(false);
            setIsPaused(true);
        } else if (sound && isPaused) {
            await sound.playAsync();
            setIsPlaying(true);
            setIsPaused(false);
        } else {
            const { sound: newSound } = await Audio.Sound.createAsync(practiceAudio);
            setSound(newSound);
            await newSound.playAsync();
            setIsPlaying(true);

            newSound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    setIsPlaying(false);
                    setIsPaused(false);
                }
            });
        }
    };

    const stopAudioAndNavigate = async (navFn?: () => void) => {
        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
            setSound(null);
        }
        setIsPlaying(false);
        setIsPaused(false);
        navFn?.();
    };

    const handleClear = () => {
        console.log('Signature cleared');
    };

    // @ts-ignore
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.topBackButton}
                onPress={() => stopAudioAndNavigate(onTopBack)}
            >
                <Ionicons name="arrow-back" size={32} color="#2b2b2b" />
            </TouchableOpacity>

            <Image source={imageSource} style={styles.letterImage} />

            <View style={styles.canvasContainer}>
                <SignatureScreen
                    onClear={handleClear}
                    backgroundColor="transparent"
                    // @ts-ignore
                    strokeColor="black"
                    strokeWidth={5}
                    viewMode="portrait"
                />
            </View>

            <View style={styles.bottomPanel}>
                <TouchableOpacity style={styles.playButton} onPress={togglePracticeAudio}>
                    <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="white" />
                </TouchableOpacity>

                <View style={styles.progressBarContainer}>
                    <View style={styles.progressBarFill} />
                </View>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => stopAudioAndNavigate(onBottomBack)}
                >
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => stopAudioAndNavigate(onNext)}
                >
                    <Ionicons name="arrow-forward" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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
        height: screenHeight * 0.15, // Ajustamos el tamaño de la imagen a un 15% de la altura de la pantalla
        marginTop: 30, // Espacio superior
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
        height: 250,  // Reducción en la altura del panel inferior
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
        right: 30,
        bottom: 70,
        backgroundColor: '#33cc66',
        borderRadius: 80,
        padding: 20,
    },
    canvasContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '90%',
        height: screenHeight * 0.2, // Reducimos el tamaño del pizarrón al 20% de la pantalla
        marginBottom: 20,
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

    backButton: {
        position: 'absolute',
        left: 30,
        bottom: 70,
        backgroundColor: '#ff6666',
        borderRadius: 80,
        padding: 20,
    },

});
