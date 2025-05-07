import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'lo', file: require('@assets/audio/levels/nivel2/audios_lesson2/lo.wav') },
        { syllable: 'llo', file: require('@assets/audio/levels/nivel2/audios_lesson2/llo.wav') },
        { syllable: 'ro', file: require('@assets/audio/levels/nivel2/audios_lesson2/ro.wav') },
    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => router.push('/(tabs)/Level2Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion2/lingualesI')}
                    // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel2/leccion2/lingualesU')}

        /> 
    );
}