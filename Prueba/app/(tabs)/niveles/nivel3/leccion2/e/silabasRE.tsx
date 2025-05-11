import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'bre', file: require('@assets/audio/levels/nivel3/audios_lesson2/e/ble.wav') },
        { syllable: 'cre', file: require('@assets/audio/levels/nivel3/audios_lesson2/e/cle.wav') },
        { syllable: 'dre', file: require('@assets/audio/levels/nivel3/audios_lesson2/e/che.wav') },
        { syllable: 'fre', file: require('@assets/audio/levels/nivel3/audios_lesson2/e/fle.wav') },
        { syllable: 'gre', file: require('@assets/audio/levels/nivel3/audios_lesson2/e/gle.wav') },
        { syllable: 'pre', file: require('@assets/audio/levels/nivel3/audios_lesson2/e/ple.wav') },
        { syllable: 'tre', file: require('@assets/audio/levels/nivel3/audios_lesson2/e/tle.wav') },

    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson2/practice.wav')}
            onTopBack={() => router.push('/(tabs)/Level3Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion2/e/firstScreen')} 
             // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion2/u/silabasLU')}
        /> 
    );
}