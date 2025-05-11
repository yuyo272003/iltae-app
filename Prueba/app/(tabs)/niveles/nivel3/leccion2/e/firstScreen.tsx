import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'ble', file: require('@assets/audio/levels/nivel3/audios_lesson2/e/ble.wav') },
        { syllable: 'cle', file: require('@assets/audio/levels/nivel3/audios_lesson2/e/cle.wav') },
        { syllable: 'fle', file: require('@assets/audio/levels/nivel3/audios_lesson2/e/fle.wav') },
        { syllable: 'gle', file: require('@assets/audio/levels/nivel3/audios_lesson2/e/gle.wav') },
        { syllable: 'ple', file: require('@assets/audio/levels/nivel3/audios_lesson2/e/ple.wav') },
        { syllable: 'tle', file: require('@assets/audio/levels/nivel3/audios_lesson2/e/tle.wav') },
        { syllable: 'che', file: require('@assets/audio/levels/nivel3/audios_lesson2/e/che.wav') },

    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson2/practice.wav')}
            onTopBack={() => router.push('/(tabs)/Level3Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion2/a/silabasRA')} 
             // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion2/o/silabasLO')}
        /> 
    );
}