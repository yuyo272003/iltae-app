import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'la', file: require('@assets/audio/levels/nivel2/audios_lesson2/la.wav') },
        { syllable: 'lla', file: require('@assets/audio/levels/nivel2/audios_lesson2/lla.wav') },
        { syllable: 'ra', file: require('@assets/audio/levels/nivel2/audios_lesson2/ra.wav') },
    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => router.push('/(tabs)/Level2Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion2/aireU')}
                    // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/lingualesE')}

        /> 
    );
}