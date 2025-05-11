import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'bri', file: require('@assets/audio/levels/nivel3/audios_lesson2/i/bli.wav') },
        { syllable: 'cri', file: require('@assets/audio/levels/nivel3/audios_lesson2/i/cli.wav') },
        { syllable: 'dri', file: require('@assets/audio/levels/nivel3/audios_lesson2/i/chi.wav') },
        { syllable: 'fri', file: require('@assets/audio/levels/nivel3/audios_lesson2/i/fli.wav') },
        { syllable: 'gri', file: require('@assets/audio/levels/nivel3/audios_lesson2/i/gli.wav') },
        { syllable: 'pri', file: require('@assets/audio/levels/nivel3/audios_lesson2/i/pli.wav') },
        { syllable: 'tri', file: require('@assets/audio/levels/nivel3/audios_lesson2/i/tli.wav') },

    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson2/practice.wav')}
            onTopBack={() => router.push('/(tabs)/Level3Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion2/i/firstScreen')} 
             // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion2/e/silabasRE')}
        /> 
    );
}