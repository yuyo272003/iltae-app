import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'me', file: require('@assets/audio/levels/nivel2/audios_lesson2/me.wav') },
        { syllable: 'ne', file: require('@assets/audio/levels/nivel2/audios_lesson2/ne.wav') },
        { syllable: 'ñe', file: require('@assets/audio/levels/nivel2/audios_lesson2/ñe.wav') },
    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => router.push('/(tabs)/Level2Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion2/firstScreen')}
                    // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel2/leccion2/nasalesI')}

        /> 
    );
}