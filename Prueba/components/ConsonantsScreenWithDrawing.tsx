import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
    FlatList
} from 'react-native';
import { Audio } from 'expo-av';
import { MaterialCommunityIcons, Ionicons  } from '@expo/vector-icons';
import SignatureScreen, { SignatureViewRef } from 'react-native-signature-canvas';
import { SafeAreaView } from 'react-native-safe-area-context';

type LetterScreenProps = {
    imageSources: any[]; // <- ahora es un array
    letterAudio: any;
    practiceAudio: any;
    onNext?: () => void;
    onTopBack?: () => void;
    onBottomBack?: () => void;
};

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function LetterScreenWithDrawing({
    imageSources,
    letterAudio,
    practiceAudio,
    onNext,
    onTopBack,
    onBottomBack,
}: LetterScreenProps) {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
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

    const handleScrollEnd = (event: any) => {
        const index = Math.round(
            event.nativeEvent.contentOffset.x / screenWidth
        );
        setCurrentIndex(index);
    };

    // Estilo mejorado para el canvas
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

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.topBackButton}
                onPress={() => stopAudioAndNavigate(onTopBack)}
            >
                <Ionicons name="arrow-back" size={32} color="#2b2b2b" />
            </TouchableOpacity>

            {/* SLIDER DE IMÁGENES */}
            <View style={styles.imageSliderContainer}>
                <FlatList
                    horizontal
                    pagingEnabled
                    data={imageSources}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Image source={item} style={styles.letterImage} />
                    )}
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={handleScrollEnd}
                />

                {/* DOTS DE INDICADOR */}
                <View style={styles.dotsContainer}>
                    {imageSources.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index ? styles.activeDot : styles.inactiveDot,
                            ]}
                        />
                    ))}
                </View>
            </View>

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

                <TouchableOpacity style={styles.restartButton} onPress={restartPracticeAudio}>
                    <Ionicons name="refresh" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => stopAudioAndNavigate(onBottomBack)}
                >
                    <Ionicons name="arrow-back" size={24} color="red" />
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
        justifyContent: 'flex-start',
        paddingTop: 20,
    },
    imageSliderContainer: {
        marginTop: 60,
        marginBottom: 20,
        alignItems: 'center',
        width: '100%',
    },
    letterImage: {
        width: screenWidth * 0.5,
        height: screenHeight * 0.1,
        resizeMode: 'contain',
        marginHorizontal: screenWidth * 0.25,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#2e6ef7',
    },
    inactiveDot: {
        backgroundColor: '#ccc',
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
    topBackButton: {
        position: 'absolute',
        top: 45,
        left: 20,
        zIndex: 10,
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 50,
        elevation: 5,
    },
    backButton: {
        position: 'absolute',
        left: 30,
        bottom: 20,
        backgroundColor: '#ffffff',
        borderRadius: 80,
        padding: 15,
    },
    nextButton: {
        position: 'absolute',
        right: 30,
        bottom: 20,
        backgroundColor: '#33cc66',
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
});