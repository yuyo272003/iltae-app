import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'ce', file: require('@assets/audio/levels/nivel2/audios_lesson2/ce.wav') },
        { syllable: 'he', file: require('@assets/audio/levels/nivel2/audios_lesson2/he.wav') },
        { syllable: 'ye', file: require('@assets/audio/levels/nivel2/audios_lesson2/ye.wav') },
        { syllable: 'we', file: require('@assets/audio/levels/nivel2/audios_lesson2/we.wav') },
    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => router.push('/(tabs)/Level2Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion2/especialesA')}
                    // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel2/leccion2/especialesI')}

        /> 
    );
}