import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'bra', file: require('@assets/audio/levels/nivel3/audios_lesson2/a/bra.wav') },
        { syllable: 'cra', file: require('@assets/audio/levels/nivel3/audios_lesson2/a/cra.wav') },
        { syllable: 'dra', file: require('@assets/audio/levels/nivel3/audios_lesson2/a/dra.wav') },
        { syllable: 'fra', file: require('@assets/audio/levels/nivel3/audios_lesson2/a/fra.wav') },
        { syllable: 'gra', file: require('@assets/audio/levels/nivel3/audios_lesson2/a/gra.wav') },
        { syllable: 'pra', file: require('@assets/audio/levels/nivel3/audios_lesson2/a/pra.wav') },
        { syllable: 'tra', file: require('@assets/audio/levels/nivel3/audios_lesson2/a/tra.wav') },

    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson2/practice.wav')}
            onTopBack={() => router.push('/(tabs)/Level3Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion2/a/firstScreen')} 
             // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion2/i/silabasRI.tsx')}
        /> 
    );
}