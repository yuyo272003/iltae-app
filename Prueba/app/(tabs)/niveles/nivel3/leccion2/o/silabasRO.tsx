import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'bro', file: require('@assets/audio/levels/nivel3/audios_lesson2/o/blo.wav') },
        { syllable: 'cro', file: require('@assets/audio/levels/nivel3/audios_lesson2/o/clo.wav') },
        { syllable: 'dro', file: require('@assets/audio/levels/nivel3/audios_lesson2/o/cho.wav') },
        { syllable: 'fro', file: require('@assets/audio/levels/nivel3/audios_lesson2/o/flo.wav') },
        { syllable: 'gro', file: require('@assets/audio/levels/nivel3/audios_lesson2/o/glo.wav') },
        { syllable: 'pro', file: require('@assets/audio/levels/nivel3/audios_lesson2/o/plo.wav') },
        { syllable: 'tro', file: require('@assets/audio/levels/nivel3/audios_lesson2/o/tlo.wav') },
    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson2/practice.wav')}
            onTopBack={() => router.push('/(tabs)/Level3Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion2/o/firstScreen')} 
             // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion2/i/firstScreen')}
        />
    );
}