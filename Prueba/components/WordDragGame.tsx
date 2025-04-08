import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    PanResponder,
    Animated,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {router} from "expo-router";
import {Audio, AVPlaybackSource} from 'expo-av';

const {width} = Dimensions.get('window');
const LETTER_BOX_SIZE = 50;
const LETTER_BOX_MARGIN = 10;

interface Slide {
    image: any;
    word: (string | null)[];
    correctLetters: string[];
    options: string[];
    audio?: any; // Add audio property to slides
}

interface WordDragGameProps {
    slides: Slide[],
    onFinish: () => void,
    firstSlideBackRoute?: string,
    lastSlideNextRoute?: string,
    onTopBack?: void
}

export default function WordDragGame({
                                         slides,
                                         onFinish,
                                         firstSlideBackRoute = '/(tabs)/Level1Screen',
                                         lastSlideNextRoute,
                                         onTopBack
                                     }: WordDragGameProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [placedLetters, setPlacedLetters] = useState<(string | null)[]>(
        slides[0].word.map((char) => (char === null ? null : char))
    );
    const [letterStatus, setLetterStatus] = useState<(null | 'correct' | 'incorrect')[]>(
        slides[0].word.map((char) => (char === null ? null : 'correct'))
    );
    const [slideCompleted, setSlideCompleted] = useState(false);

    // Audio state
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const slide = slides[currentSlide];
    const isLastSlide = currentSlide === slides.length - 1;
    const isFirstSlide = currentSlide === 0;

    const nullPositions = slide.word
        .map((char, i) => (char === null ? i : null))
        .filter((i) => i !== null) as number[];

    // Check if current slide is completed
    useEffect(() => {
        const allCorrect = letterStatus.every((status, index) => {
            // If this position was originally null, check for correctness
            if (slide.word[index] === null) {
                return status === 'correct';
            }
            // If it was a pre-filled letter, it's already considered correct
            return true;
        });

        const allFilled = placedLetters.every((letter, index) => {
            // Only check positions that were originally null
            if (slide.word[index] === null) {
                return letter !== null;
            }
            return true;
        });

        setSlideCompleted(allCorrect && allFilled);
    }, [letterStatus, placedLetters, slide.word]);

    // Reset the game to initial state
    const resetGame = () => {
        setCurrentSlide(0);
        setPlacedLetters(slides[0].word.map((char) => (char === null ? null : char)));
        setLetterStatus(slides[0].word.map((char) => (char === null ? null : 'correct')));
        setSlideCompleted(false);
    };

    // Audio functions
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
            const {sound: newSound} = await Audio.Sound.createAsync(slide.audio);
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
        // Only allow proceeding if slide is completed (or if we've somehow forced it for testing)
        if (!slideCompleted && !isLastSlide) return;

        await stopAudio();

        if (isLastSlide) {
            // If on last slide and there's a specific route, go there
            if (lastSlideNextRoute) {
                resetGame(); // Reset game state
                // @ts-ignore
                router.push(lastSlideNextRoute);
            } else {
                // Otherwise use the default onFinish callback
                resetGame(); // Reset game state
                onFinish();
            }
        } else {
            // Move to next slide
            const next = currentSlide + 1;
            setCurrentSlide(next);
            setPlacedLetters(slides[next].word.map((char) => (char === null ? null : char)));
            setLetterStatus(slides[next].word.map((char) => (char === null ? null : 'correct')));
            setSlideCompleted(false);
        }
    };

    const goToBack = async () => {
        await stopAudio();

        if (isFirstSlide) {
            // If on first slide, reset game and go to configured route
            resetGame();
            // @ts-ignore
            router.push(firstSlideBackRoute);
        } else {
            // Move to previous slide
            const prev = currentSlide - 1;
            setCurrentSlide(prev);
            setPlacedLetters(slides[prev].word.map((char) => (char === null ? null : char)));
            setLetterStatus(slides[prev].word.map((char) => (char === null ? null : 'correct')));
            setSlideCompleted(false);
        }
    };

    const exitToLevel = async () => {
        await stopAudio();
        resetGame(); // Reset game state before navigating away
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
        const pan = useState(new Animated.ValueXY())[0];

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({x: 0, y: 0});
            },
            onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
                useNativeDriver: false,
            }),
            onPanResponderRelease: () => {
                const dropIndex = slide.word.findIndex((c, i) => c === null && placedLetters[i] === null);
                if (dropIndex !== -1) handleDrop(letter, dropIndex);
                Animated.spring(pan, {
                    toValue: {x: 0, y: 0},
                    useNativeDriver: false,
                }).start();
            },
        });

        return (
            <Animated.View
                key={idx}
                style={[styles.draggableBox, {transform: pan.getTranslateTransform()}]}
                {...panResponder.panHandlers}
            >
                <Text style={styles.draggableText}>{letter}</Text>
            </Animated.View>
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.topBackButton}
                              onPress={onTopBack ?? exitToLevel}
            >
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>


            <Image source={slide.image} style={styles.image} resizeMode="contain"/>

            <View style={styles.wordContainer}>
                {slide.word.map((char, index) => renderDropZone(char, index))}
            </View>

            <View style={styles.optionsContainer}>
                {slide.options.map((letter, idx) => renderDraggableLetter(letter, idx))}
            </View>

            <View style={styles.bottomPanel}>
                <TouchableOpacity
                    style={styles.playButton}
                    onPress={toggleAudio}
                >
                    <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="white"/>
                </TouchableOpacity>

                <View style={styles.progressBarContainer}>
                    <View style={styles.progressBarFill}/>
                </View>

                <TouchableOpacity
                    style={styles.restartButton}
                    onPress={restartAudio}
                >
                    <Ionicons name="refresh" size={24} color="white"/>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={goToBack}
                >
                    <Ionicons name="arrow-back" size={24} color="white"/>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.nextButton,
                        // Disable button styling if not completed and not last slide
                        (!slideCompleted && !isLastSlide) && styles.nextButtonDisabled
                    ]}
                    onPress={goToNext}
                    disabled={!slideCompleted && !isLastSlide}
                >
                    <Ionicons name="arrow-forward" size={28} color="white"/>
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
        alignItems: 'center',
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
        marginBottom: 20,
    },
    wordContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
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
    dropText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 16,
    },
    draggableBox: {
        backgroundColor: '#efefef',
        padding: 12,
        borderRadius: 8,
        margin: 8,
        minWidth: LETTER_BOX_SIZE,
        alignItems: 'center',
    },
    draggableText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    bottomPanel: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 220,
        backgroundColor: '#2b2b2b',
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
    restartButton: {
        position: 'absolute',
        bottom: 30,
        backgroundColor: '#2e6ef7',
        borderRadius: 50,
        padding: 16,
        alignSelf: 'center',
    },
    nextButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        backgroundColor: '#33cc66',
        borderRadius: 50,
        padding: 16,
    },
    nextButtonDisabled: {
        backgroundColor: '#a0ceb5', // Lighter green to indicate disabled state
        opacity: 0.7,
    },
    backButton: {
        position: 'absolute',
        left: 30,
        bottom: 30,
        backgroundColor: '#ff6666',
        borderRadius: 50,
        padding: 16,
    },
});