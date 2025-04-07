// WordCompletionGame.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface Slide {
    image: any;
    word: (string | '□')[];
    correctLetter: string;
    options: string[];
}

interface Props {
    slides: Slide[];
    onFinish?: () => void;
}

const WordCompletionGame: React.FC<Props> = ({ slides, onFinish }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<(string | null)[]>(slides.map(() => null));
    const [feedback, setFeedback] = useState<(boolean | null)[]>(slides.map(() => null));

    const handleSelect = (letter: string) => {
        const currentSlide = slides[currentIndex];
        const isCorrect = letter === currentSlide.correctLetter;
        const updatedAnswers = [...answers];
        const updatedFeedback = [...feedback];

        updatedAnswers[currentIndex] = letter;
        updatedFeedback[currentIndex] = isCorrect;

        setAnswers(updatedAnswers);
        setFeedback(updatedFeedback);

        if (isCorrect && currentIndex < slides.length - 1) {
            setTimeout(() => setCurrentIndex(currentIndex + 1), 800);
        } else if (isCorrect && currentIndex === slides.length - 1) {
            onFinish?.();
        }
    };

    const renderSlide = ({ item, index }: { item: Slide; index: number }) => {
        const isActive = index === currentIndex;
        const userAnswer = answers[index];
        const isCorrect = feedback[index];

        return (
            <View style={styles.slide}>
                <Image source={item.image} style={styles.image} resizeMode="contain" />

                <View style={styles.wordContainer}>
                    {item.word.map((char, i) => (
                        <Text key={i} style={styles.wordLetter}>
                            {char === '□'
                                ? userAnswer
                                    ? userAnswer
                                    : '□'
                                : char}
                        </Text>
                    ))}
                </View>

                <View style={styles.optionsRow}>
                    {item.options.map((letter, i) => (
                        <TouchableOpacity
                            key={i}
                            onPress={() => isActive && handleSelect(letter)}
                            style={[styles.optionButton,
                                userAnswer === letter && isCorrect === false && { backgroundColor: '#ff4d4d' },
                                userAnswer === letter && isCorrect === true && { backgroundColor: '#33cc66' },
                            ]}>
                            <Text style={styles.optionLetter}>{letter}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    };

    return (
        <FlatList
            horizontal
            pagingEnabled
            scrollEnabled={false}
            data={slides}
            renderItem={renderSlide}
            keyExtractor={(_, i) => i.toString()}
            extraData={{ answers, feedback }}
            showsHorizontalScrollIndicator={false}
            style={styles.flatlist}
        />
    );
};

const styles = StyleSheet.create({
    flatlist: {
        flexGrow: 0,
    },
    slide: {
        width,
        paddingTop: 80,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    image: {
        width: 160,
        height: 160,
        marginBottom: 24,
    },
    wordContainer: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    wordLetter: {
        fontSize: 40,
        fontWeight: 'bold',
        marginHorizontal: 4,
    },
    optionsRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 40,
    },
    optionButton: {
        backgroundColor: '#e0e0e0',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    optionLetter: {
        fontSize: 28,
        fontWeight: 'bold',
    },
});

export default WordCompletionGame;
