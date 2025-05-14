import React, { useState, useRef} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { Audio, AVPlaybackSource } from 'expo-av';
import { MaterialCommunityIcons, Ionicons  } from '@expo/vector-icons';
import SignatureScreen, { SignatureViewRef } from 'react-native-signature-canvas';
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
    const signatureRef = useRef<SignatureViewRef>(null);


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

    const restartPracticeAudio = async () => {
        if (sound) {
            await sound.stopAsync();
            await sound.setPositionAsync(0);
            await sound.playAsync();
            setIsPlaying(true);
            setIsPaused(false);
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
        if (signatureRef.current) {
            signatureRef.current.clearSignature();
        }
        console.log('Signature cleared');
    };

    const style = `
        .m-signature-pad {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            box-shadow: none;
            border: none;
            background-color: #f0f0f0;
        }
        .m-signature-pad--body {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            padding-top: 40px; /* Espacio para el botón borrador */
        }
        .m-signature-pad--footer {
            display: none;
        }
        body, html {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
        }
        canvas {
            width: 100%;
            height: 100%;
            background-color: #f0f0f0;
        }
    `;

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

             {/* CONTENEDOR DE LA PIZARRA */}
            <View style={styles.canvasContainer}>
                <TouchableOpacity style={styles.eraserButton} onPress={handleClear}>
                   <MaterialCommunityIcons name="eraser" size={18} color="#ffffff" />
                </TouchableOpacity>
                
                <SignatureScreen
                    ref={signatureRef}
                    onOK={() => {}}
                    webStyle={style}
                    penColor="black"
                    minWidth={3}
                    maxWidth={7}
                    descriptionText=""
                    clearText=""
                    confirmText=""
                    imageType="image/png"
                    backgroundColor="#f0f0f0"
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
                    style={styles.restartButton}
                    onPress={restartPracticeAudio}
                >
                    <Ionicons name="refresh" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() =>
                        {  handleClear();
                        stopAudioAndNavigate(onBottomBack);}}
                >
                    <Ionicons name="arrow-back" size={24} color="red" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => {
                        handleClear(); // Limpiar la firma
                        stopAudioAndNavigate(onNext); // Navegar
                    }}
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
        justifyContent: 'flex-start',
        paddingTop: 20,
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
        width: '100%',
        alignItems: 'center',
        marginBottom: 16,
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
        bottom: 20,
        backgroundColor: '#33cc66',
        borderRadius: 80,
        padding: 15,
    },
    canvasContainer: {
        width: '90%',
        height: screenHeight * 0.4,
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 12,
        marginBottom: 20,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    topBackButton: { 
        position: 'absolute',
        top: 35, 
        left: 15, 
        zIndex: 10, 
        backgroundColor: '#f0f0f0', 
        padding: 15, 
        borderRadius: 50 },

    backButton: {
        position: 'absolute',
        left: 30,
        bottom: 20,
        backgroundColor: '#ffffff',
        borderRadius: 80,
        padding: 15,
    },
    restartButton: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: '#2e6ef7',
        borderRadius: 50,
        padding: 15,
        alignSelf: 'center',
    },
    eraserButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2e6ef7',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    eraserButtonText: {
        color: '#555',
        marginLeft: 3,
        fontSize: 12,
        fontWeight: '500',
    },

});
