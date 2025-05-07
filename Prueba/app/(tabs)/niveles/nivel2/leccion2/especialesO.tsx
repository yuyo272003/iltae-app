import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'co', file: require('@assets/audio/levels/nivel2/audios_lesson2/co.wav') },
        { syllable: 'ho', file: require('@assets/audio/levels/nivel2/audios_lesson2/ho.wav') },
        { syllable: 'yo', file: require('@assets/audio/levels/nivel2/audios_lesson2/yo.wav') },
        { syllable: 'wo', file: require('@assets/audio/levels/nivel2/audios_lesson2/wo.wav') },
    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => router.push('/(tabs)/Level2Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion2/especialesI')}
                    // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel2/leccion2/especialesU')}

        /> 
    );
}