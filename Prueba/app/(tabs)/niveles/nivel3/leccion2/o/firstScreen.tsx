import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'blo', file: require('@assets/audio/levels/nivel3/audios_lesson2/o/blo.wav') },
        { syllable: 'clo', file: require('@assets/audio/levels/nivel3/audios_lesson2/o/clo.wav') },
        { syllable: 'flo', file: require('@assets/audio/levels/nivel3/audios_lesson2/o/flo.wav') },
        { syllable: 'glo', file: require('@assets/audio/levels/nivel3/audios_lesson2/o/glo.wav') },
        { syllable: 'plo', file: require('@assets/audio/levels/nivel3/audios_lesson2/o/plo.wav') },
        { syllable: 'tlo', file: require('@assets/audio/levels/nivel3/audios_lesson2/o/tlo.wav') },
        { syllable: 'cho', file: require('@assets/audio/levels/nivel3/audios_lesson2/o/cho.wav') },

    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson2/practice.wav')}
            onTopBack={() => router.push('/(tabs)/Level3Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion2/i/silabasRI')} 
             // @ts-ignore
            onNext={() => router.push('/(tabs)/Level3Screen')}
        /> 
    );
}