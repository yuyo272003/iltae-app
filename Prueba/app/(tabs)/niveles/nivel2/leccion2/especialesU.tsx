import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'cu', file: require('@assets/audio/levels/nivel2/audios_lesson2/fu.wav') },
        { syllable: 'hu', file: require('@assets/audio/levels/nivel2/audios_lesson2/ju.wav') },
        { syllable: 'yu', file: require('@assets/audio/levels/nivel2/audios_lesson2/zu.wav') },
        { syllable: 'wu', file: require('@assets/audio/levels/nivel2/audios_lesson2/su.wav') },
    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => router.push('/(tabs)/Level2Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion2/especialesO')}
                    // @ts-ignore
            onNext={() => router.push('/(tabs)/Level2Screen')}

        /> 
    );
}