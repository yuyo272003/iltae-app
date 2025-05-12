import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'bru', file: require('@assets/audio/levels/nivel3/audios_lesson2/u/bru.wav') },
        { syllable: 'cru', file: require('@assets/audio/levels/nivel3/audios_lesson2/u/cru.wav') },
        { syllable: 'dru', file: require('@assets/audio/levels/nivel3/audios_lesson2/u/dru.wav') },
        { syllable: 'fru', file: require('@assets/audio/levels/nivel3/audios_lesson2/u/fru.wav') },
        { syllable: 'gru', file: require('@assets/audio/levels/nivel3/audios_lesson2/u/gru.wav') },
        { syllable: 'pru', file: require('@assets/audio/levels/nivel3/audios_lesson2/u/pru.wav') },
        { syllable: 'tru', file: require('@assets/audio/levels/nivel3/audios_lesson2/u/tru.wav') },
    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson2/practice.wav')}
            onTopBack={() => router.push('/(tabs)/Level3Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion2/u/firstScreen')}
             // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion2/o/silabasRO')}

        /> 
    );
}