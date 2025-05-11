import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'bla', file: require('@assets/audio/levels/nivel3/audios_lesson2/a/bla.wav') },
        { syllable: 'cla', file: require('@assets/audio/levels/nivel3/audios_lesson2/a/cla.wav') },
        { syllable: 'fla', file: require('@assets/audio/levels/nivel3/audios_lesson2/a/fla.wav') },
        { syllable: 'gla', file: require('@assets/audio/levels/nivel3/audios_lesson2/a/gla.wav') },
        { syllable: 'pla', file: require('@assets/audio/levels/nivel3/audios_lesson2/a/pla.wav') },
        { syllable: 'tla', file: require('@assets/audio/levels/nivel3/audios_lesson2/a/tla.wav') },
        { syllable: 'cha', file: require('@assets/audio/levels/nivel3/audios_lesson2/a/cha.wav') },

    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson2/practice.wav')}
            onTopBack={() => router.push('/(tabs)/Level3Screen')}
            onBottomBack={() => router.push('/(tabs)/Level3Screen')} // revisar
                    // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion2/u/silabasRU')}

        /> 
    );
}