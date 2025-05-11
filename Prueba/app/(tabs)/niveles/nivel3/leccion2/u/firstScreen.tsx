import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'blu', file: require('@assets/audio/levels/nivel3/audios_lesson2/u/blu.wav') },
        { syllable: 'clu', file: require('@assets/audio/levels/nivel3/audios_lesson2/u/clu.wav') },
        { syllable: 'flu', file: require('@assets/audio/levels/nivel3/audios_lesson2/u/flu.wav') },
        { syllable: 'glu', file: require('@assets/audio/levels/nivel3/audios_lesson2/u/glu.wav') },
        { syllable: 'plu', file: require('@assets/audio/levels/nivel3/audios_lesson2/u/plu.wav') },
        { syllable: 'tlu', file: require('@assets/audio/levels/nivel3/audios_lesson2/u/tlu.wav') },
        { syllable: 'chu', file: require('@assets/audio/levels/nivel3/audios_lesson2/u/chu.wav') },

    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson2/practice.wav')}
            onTopBack={() => router.push('/(tabs)/Level3Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion2/o/silabasRO')} 
             // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion2/a/silabasRA')}
        /> 
    );
}