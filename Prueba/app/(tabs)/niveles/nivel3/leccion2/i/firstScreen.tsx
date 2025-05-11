import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'bli', file: require('@assets/audio/levels/nivel3/audios_lesson2/i/bli.wav') },
        { syllable: 'cli', file: require('@assets/audio/levels/nivel3/audios_lesson2/i/cli.wav') },
        { syllable: 'fli', file: require('@assets/audio/levels/nivel3/audios_lesson2/i/fli.wav') },
        { syllable: 'gli', file: require('@assets/audio/levels/nivel3/audios_lesson2/i/gli.wav') },
        { syllable: 'pli', file: require('@assets/audio/levels/nivel3/audios_lesson2/i/pli.wav') },
        { syllable: 'tli', file: require('@assets/audio/levels/nivel3/audios_lesson2/i/tli.wav') },
        { syllable: 'chi', file: require('@assets/audio/levels/nivel3/audios_lesson2/i/chi.wav') },

    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson2/practice.wav')}
            onTopBack={() => router.push('/(tabs)/Level3Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion2/e/silabasRE')} 
             // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion2/e/firstScreen')}
        /> 
    );
}