import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    PanResponder,
    Animated,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/scripts/api';
import { avanzarLeccion } from '@/utils/leassonProgress';

const LETTER_BOX_SIZE = 50;
const LETTER_BOX_MARGIN = 10;

interface Slide {
    image: any;
    word: (string | null)[];
    correctLetters: string[];
    options: string[];
    audio?: any;
}

interface WordDragGameProps {
    slides: Slide[];
    onFinish: () => void;
    firstSlideBackRoute?: string;
    lastSlideNextRoute?: string;
    onTopBack?: () => void;
    advanceEndpoint?: string; // 👈 nuevo
}


export default function WordDragGame({
                                         slides,
                                         onFinish,
                                         firstSlideBackRoute = '/(tabs)/Level1Screen',
                                         lastSlideNextRoute,
                                         onTopBack,
                                         advanceEndpoint = "/progreso/avanzar",
                                     }: WordDragGameProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [placedLetters, setPlacedLetters] = useState<(string | null)[]>([]);
    const [letterStatus, setLetterStatus] = useState<(null | 'correct' | 'incorrect')[]>([]);
    const [slideCompleted, setSlideCompleted] = useState(false);
    const [panRefs, setPanRefs] = useState<Animated.ValueXY[]>([]);

    const [nivelId, setNivelId] = useState<number | null>(null);
    const [leccionId, setLeccionId] = useState<number | null>(null);

    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const slide = slides[currentSlide];
    const isLastSlide = currentSlide === slides.length - 1;
    const isFirstSlide = currentSlide === 0;

    const nullPositions = slide.word
        .map((char, i) => (char === null ? i : null))
        .filter((i) => i !== null) as number[];

    useEffect(() => {
        const fetchProgreso = async () => {
            try {
                const token = await AsyncStorage.getItem("auth_token");
                const response = await api.get("/progreso", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });

                setNivelId(response.data.nivel_id);
                setLeccionId(response.data.leccion_id);
            } catch (error) {
                console.error("Error al obtener el progreso del usuario:", error);
            }
        };

        fetchProgreso();
    }, []);

    useEffect(() => {
        setPlacedLetters(slide.word.map((char) => (char === null ? null : char)));
        setLetterStatus(slide.word.map(() => null));
        setSlideCompleted(false);

        const newRefs = Array(slide.options.length).fill(null).map(() => new Animated.ValueXY());
        setPanRefs(newRefs);
    }, [currentSlide]);

    useEffect(() => {
        const allCorrect = letterStatus.every((status, index) => {
            return slide.word[index] === null ? status === 'correct' : true;
        });

        const allFilled = placedLetters.every((letter, index) => {
            return slide.word[index] === null ? letter !== null : true;
        });

        setSlideCompleted(allCorrect && allFilled);
    }, [letterStatus, placedLetters, slide.word]);

    const resetGame = () => {
        setCurrentSlide(0);
    };

    const toggleAudio = async () => {
        if (sound && isPlaying) {
            await sound.pauseAsync();
            setIsPlaying(false);
            setIsPaused(true);
        } else if (sound && isPaused) {
            await sound.playAsync();
            setIsPlaying(true);
            setIsPaused(false);
        } else if (slide.audio) {
            const { sound: newSound } = await Audio.Sound.createAsync(slide.audio);
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

    const restartAudio = async () => {
        if (sound) {
            await sound.stopAsync();
            await sound.setPositionAsync(0);
            await sound.playAsync();
            setIsPlaying(true);
            setIsPaused(false);
        }
    };

    const stopAudio = async () => {
        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
            setSound(null);
        }
        setIsPlaying(false);
        setIsPaused(false);
    };

    const handleDrop = (letter: string, index: number) => {
        const relativeIndex = nullPositions.indexOf(index);
        const expectedLetter = slide.correctLetters[relativeIndex];

        const newLetters = [...placedLetters];
        newLetters[index] = letter;
        setPlacedLetters(newLetters);

        const newStatus = [...letterStatus];

        if (letter === expectedLetter) {
            newStatus[index] = 'correct';
            setLetterStatus(newStatus);
        } else {
            newStatus[index] = 'incorrect';
            setLetterStatus(newStatus);
            setTimeout(() => {
                newLetters[index] = null;
                newStatus[index] = null;
                setPlacedLetters([...newLetters]);
                setLetterStatus([...newStatus]);
            }, 800);
        }
    };

    const goToNext = async () => {
        if (!slideCompleted && !isLastSlide) return;

        await stopAudio();

        if (isLastSlide) {
            try {
                await avanzarLeccion(advanceEndpoint);
                console.log("Avanzó de lección");
            } catch (e) {
                console.error("No se pudo avanzar de lección");
            }

            resetGame();
            // @ts-ignore
            lastSlideNextRoute ? router.push(lastSlideNextRoute) : onFinish();
        } else {
            setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
        }
    };


    const goToBack = async () => {
        await stopAudio();
        if (isFirstSlide) {
            resetGame();
            // @ts-ignore
            router.push(firstSlideBackRoute);
        } else {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const exitToLevel = async () => {
        await stopAudio();
        resetGame();
        // @ts-ignore
        router.push(firstSlideBackRoute);
    };

    const renderDropZone = (char: string | null, index: number) => (
        <View
            key={index}
            style={[
                styles.dropZone,
                {
                    backgroundColor:
                        letterStatus[index] === 'correct' ? '#a1e3a1' :
                            letterStatus[index] === 'incorrect' ? '#f8bcbc' :
                                'white',
                },
            ]}
        >
            <Text style={styles.dropText}>{char ?? placedLetters[index]}</Text>
        </View>
    );

    const renderDraggableLetter = (letter: string, idx: number) => {
        const pan = panRefs[idx];
        if (!pan) return null;

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({ x: 0, y: 0 });
            },
            onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
                useNativeDriver: false,
            }),
            onPanResponderRelease: () => {
                const dropIndex = slide.word.findIndex((c, i) => c === null && placedLetters[i] === null);
                if (dropIndex !== -1) handleDrop(letter, dropIndex);
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false,
                }).start();
            },
        });

        return (
            <Animated.View
                key={idx}
                style={[styles.draggableBox, { transform: pan.getTranslateTransform() }]}
                {...panResponder.panHandlers}
            >
                <Text style={styles.draggableText}>{letter}</Text>
            </Animated.View>
        );
    };

    if (!panRefs.length || panRefs.length !== slide.options.length) {
        return null;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.topBackButton} onPress={onTopBack ?? exitToLevel}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <Image source={slide.image} style={styles.image} resizeMode="contain" />

            <View style={styles.wordContainer}>
                {slide.word.map((char, index) => renderDropZone(char, index))}
            </View>

            <View style={styles.optionsContainer}>
                {slide.options.map((letter, idx) => renderDraggableLetter(letter, idx))}
            </View>

            <View style={styles.bottomPanel}>
                <TouchableOpacity style={styles.playButton} onPress={toggleAudio}>
                    <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="white" />
                </TouchableOpacity>

                <View style={styles.progressBarContainer}>
                    <View style={styles.progressBarFill} />
                </View>

                <TouchableOpacity style={styles.restartButton} onPress={restartAudio}>
                    <Ionicons name="refresh" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.backButton} onPress={goToBack}>
                    <Ionicons name="arrow-back" size={24} color="red" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.nextButton, (!slideCompleted && !isLastSlide) && styles.nextButtonDisabled]}
                    onPress={goToNext}
                    disabled={!slideCompleted && !isLastSlide}
                >
                    <Ionicons name="arrow-forward" size={28} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        paddingTop: 60, 
        backgroundColor: 'white', 
        alignItems: 'center' 
    },
    topBackButton: {
        position: 'absolute', 
        top: 40, 
        left: 20, 
        zIndex: 10, 
        backgroundColor: '#e0e0e0',
        padding: 12, 
        borderRadius: 30,
    },
    image: { 
        width: 200, 
        height: 200, 
        marginBottom: 20 
    },
    wordContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        rowGap: 12,
        columnGap: 4,
        marginBottom: 40,
    },
    dropZone: {
        width: LETTER_BOX_SIZE, 
        height: LETTER_BOX_SIZE, 
        marginHorizontal: LETTER_BOX_MARGIN,
        borderRadius: 8, 
        borderWidth: 2, 
        borderColor: '#333', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    dropText: { fontSize: 28, fontWeight: 'bold' },
    optionsContainer: {
        flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 16,
    },
    draggableBox: {
        backgroundColor: '#efefef', padding: 12, borderRadius: 8, margin: 8,
        minWidth: LETTER_BOX_SIZE, alignItems: 'center',
    },
    draggableText: { fontSize: 24, fontWeight: 'bold' },
    bottomPanel: {
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 220, backgroundColor: '#2b2b2b',
        borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, alignItems: 'center', elevation: 10,
    },
    playButton: {
        backgroundColor: '#2e6ef7', padding: 16, borderRadius: 12, width: '100%',
        alignItems: 'center', marginBottom: 16,
    },
    progressBarContainer: {
        height: 6, backgroundColor: '#ccc', width: '90%', borderRadius: 3, marginBottom: 16,
    },
    progressBarFill: {
        width: '50%', height: '100%', backgroundColor: '#2e6ef7', borderRadius: 3,
    },
    restartButton: {
        position: 'absolute', bottom: 30, backgroundColor: '#2e6ef7',
        borderRadius: 50, padding: 16, alignSelf: 'center',
    },
    nextButton: {
        position: 'absolute', right: 30, bottom: 30, backgroundColor: '#33cc66',
        borderRadius: 50, padding: 16,
    },
    nextButtonDisabled: {
        backgroundColor: '#a0ceb5', opacity: 0.7,
    },
    backButton: {
        position: 'absolute', left: 30, bottom: 30, backgroundColor: '#ffffff',
        borderRadius: 50, padding: 16,
    },
});
