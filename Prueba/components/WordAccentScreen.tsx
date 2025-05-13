// WordAccentScreen.tsx

import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import { Audio } from 'expo-av';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import SignatureScreen, { SignatureViewRef } from 'react-native-signature-canvas';
import { SafeAreaView } from 'react-native-safe-area-context';

type WordAccentScreenProps = {
    word: string;
    letterAudio: any;     // audio de pronunciación inline
    practiceAudio: any;   // audio de práctica en el panel inferior
    onNext?: () => void;
    onTopBack?: () => void;
    onBottomBack?: () => void;
};

const screenHeight = Dimensions.get('window').height;

export default function WordAccentScreen({
                                             word,
                                             letterAudio,
                                             practiceAudio,
                                             onNext,
                                             onTopBack,
                                             onBottomBack,
                                         }: WordAccentScreenProps) {
    // --- Inline audio (letterAudio) ---
    const [soundInline, setSoundInline] = useState<Audio.Sound | null>(null);
    const [inlinePlaying, setInlinePlaying] = useState(false);
    const [inlinePaused, setInlinePaused] = useState(false);

    // --- Practice audio (practiceAudio) ---
    const [soundPractice, setSoundPractice] = useState<Audio.Sound | null>(null);
    const [practicePlaying, setPracticePlaying] = useState(false);
    const [practicePaused, setPracticePaused] = useState(false);

    const signatureRef = useRef<SignatureViewRef>(null);

    // Función genérica para togglear un audio
    const toggleAudio = async (
        audioSource: any,
        soundState: Audio.Sound | null,
        setSound: (s: Audio.Sound | null) => void,
        isPlaying: boolean,
        setPlaying: (b: boolean) => void,
        isPaused: boolean,
        setPaused: (b: boolean) => void
    ) => {
        if (soundState && isPlaying) {
            await soundState.pauseAsync();
            setPlaying(false);
            setPaused(true);
        } else if (soundState && isPaused) {
            await soundState.playAsync();
            setPlaying(true);
            setPaused(false);
        } else {
            const { sound: newSound } = await Audio.Sound.createAsync(audioSource);
            setSound(newSound);
            await newSound.playAsync();
            setPlaying(true);
            newSound.setOnPlaybackStatusUpdate(status => {
                if (status.isLoaded && status.didJustFinish) {
                    setPlaying(false);
                    setPaused(false);
                }
            });
        }
    };

    const toggleInlineAudio = () =>
        toggleAudio(
            letterAudio,
            soundInline,
            setSoundInline,
            inlinePlaying,
            setInlinePlaying,
            inlinePaused,
            setInlinePaused
        );

    const togglePracticeAudio = () =>
        toggleAudio(
            practiceAudio,
            soundPractice,
            setSoundPractice,
            practicePlaying,
            setPracticePlaying,
            practicePaused,
            setPracticePaused
        );

    const restartPracticeAudio = async () => {
        if (soundPractice) {
            await soundPractice.stopAsync();
            await soundPractice.setPositionAsync(0);
            await soundPractice.playAsync();
            setPracticePlaying(true);
            setPracticePaused(false);
        }
    };

    const stopAllAndNavigate = async (navFn?: () => void) => {
        if (soundInline) {
            await soundInline.stopAsync();
            await soundInline.unloadAsync();
            setSoundInline(null);
            setInlinePlaying(false);
            setInlinePaused(false);
        }
        if (soundPractice) {
            await soundPractice.stopAsync();
            await soundPractice.unloadAsync();
            setSoundPractice(null);
            setPracticePlaying(false);
            setPracticePaused(false);
        }
        navFn?.();
    };

    const handleClear = () => signatureRef.current?.clearSignature();

    // Estilos para el canvas transparente
    const webStyle = `
    .m-signature-pad, canvas {
      background-color: transparent !important;
      position: absolute; left: 0; top: 0; width: 100%; height: 100%;
    }
    .m-signature-pad--footer { display: none; }
    html, body { margin:0; padding:0; background: transparent; }
  `;

    return (
        <SafeAreaView style={styles.container}>
            {/* Botón atrás superior */}
            <TouchableOpacity
                style={styles.topBackButton}
                onPress={() => stopAllAndNavigate(onTopBack)}
            >
                <Ionicons name="arrow-back" size={28} color="#2b2b2b" />
            </TouchableOpacity>

            {/* Pizarrón con canvas abajo y texto + borrador arriba */}
            <View style={styles.canvasContainer}>
                {/* 1) Canvas en el fondo */}
                <SignatureScreen
                    ref={signatureRef}
                    webStyle={webStyle}
                    penColor="black"
                    minWidth={0.5}
                    maxWidth={3}
                    descriptionText=""
                    clearText=""
                    confirmText=""
                    imageType="image/png"
                    backgroundColor="transparent"
                />

                {/* 2) Texto de la palabra encima */}
                <Text style={styles.wordText}>{word}</Text>

                {/* 3) Botón borrador encima */}
                <TouchableOpacity style={styles.eraserButton} onPress={handleClear}>
                    <MaterialCommunityIcons name="eraser" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Botón inline de letterAudio */}
            <TouchableOpacity style={styles.inlinePlayButton} onPress={toggleInlineAudio}>
                <Ionicons
                    name={inlinePlaying ? "pause" : "volume-high"}
                    size={28}
                    color="white"
                />
            </TouchableOpacity>

            {/* Panel inferior con practiceAudio */}
            <View style={styles.bottomPanel}>
                <TouchableOpacity
                    style={styles.playButton}
                    onPress={togglePracticeAudio}
                >
                    <Ionicons
                        name={practicePlaying ? "pause" : "play"}
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>

                <View style={styles.progressBarContainer}>
                    <View
                        style={[
                            styles.progressBarFill,
                            { width: practicePlaying ? '70%' : '0%' }
                        ]}
                    />
                </View>

                <TouchableOpacity
                    style={styles.restartButton}
                    onPress={restartPracticeAudio}
                >
                    <Ionicons name="refresh" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => {
                        handleClear();
                        stopAllAndNavigate(onBottomBack);
                    }}
                >
                    <Ionicons name="arrow-back" size={24} color="red" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => {
                        handleClear();
                        stopAllAndNavigate(onNext);
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
        paddingTop: 20,
    },
    topBackButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 24,
        zIndex: 5,
        elevation: 5,
    },
    canvasContainer: {
        position: 'relative',
        width: '90%',
        height: screenHeight * 0.4,
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 12,
        marginTop: 100,
        backgroundColor: '#e0e0e0',
        overflow: 'hidden',
    },
    wordText: {
        position: 'absolute',
        top: '45%',
        width: '100%',
        textAlign: 'center',
        fontSize: 100,
        fontWeight: '700',
        color: '#333',
        textTransform: 'lowercase',
        zIndex: 2,
        elevation: 2,
    },
    eraserButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#2e6ef7',
        padding: 6,
        borderRadius: 16,
        zIndex: 3,
        elevation: 3,
    },
    inlinePlayButton: {
        backgroundColor: '#2e6ef7',
        padding: 12,
        borderRadius: 24,
        marginTop: 16,
        elevation: 3,
    },
    bottomPanel: {
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 220, backgroundColor: '#2b2b2b',
        borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, alignItems: 'center', elevation: 10,
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
        height: '100%',
        backgroundColor: '#2e6ef7',
        borderRadius: 3,
    },
    restartButton: {
        position: 'absolute', bottom: 30, backgroundColor: '#2e6ef7',
        borderRadius: 50, padding: 16, alignSelf: 'center',
    },
    nextButton: {
        position: 'absolute', right: 30, bottom: 30, backgroundColor: '#33cc66',
        borderRadius: 50, padding: 16,
    },

    backButton: {
        position: 'absolute', left: 30, bottom: 30, backgroundColor: '#ffffff',
        borderRadius: 50, padding: 16,
    },
});
