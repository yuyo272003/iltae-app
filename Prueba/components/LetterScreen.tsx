import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import {Audio, AVPlaybackSource} from 'expo-av';
import {Ionicons} from '@expo/vector-icons';

type LetterScreenProps = {
    letter: string,
    letterAudio: any,
    practiceAudio: any,
    onNext?: () => void; // Agregamos esta prop opciona
};

export default function LetterScreen({letter, letterAudio, practiceAudio, onNext}: LetterScreenProps) {
    const playSound = async (file: AVPlaybackSource) => {
        const {sound} = await Audio.Sound.createAsync(file);
        await sound.playAsync();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.letterText}>{letter}</Text>

            <TouchableOpacity
                style={styles.soundButton}
                onPress={() => playSound(letterAudio)}
            >
                <Ionicons name="volume-high" size={24} color="white"/>
            </TouchableOpacity>

            <View style={styles.bottomPanel}>
                <TouchableOpacity
                    style={styles.playButton}
                    onPress={() => playSound(practiceAudio)}
                >
                    <Ionicons name="play" size={24} color="white"/>
                </TouchableOpacity>

                <View style={styles.progressBarContainer}>
                    <View style={styles.progressBarFill}/>
                </View>

                <TouchableOpacity style={styles.nextButton} onPress={onNext}>
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
        paddingBottom: 200, // ⬅️ igual al alto del panel gris
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
    bottomPanel: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 300, // ⬅️ antes era 160, puedes ajustar más si quieres
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
    nextButton: {
        position: 'absolute',
        right: 24,
        bottom: 24,
        backgroundColor: '#33cc66',
        borderRadius: 50,
        padding: 20,
    },
});