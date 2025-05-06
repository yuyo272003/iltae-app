import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'le', file: require('@assets/audio/levels/nivel2/audios_lesson2/le.wav') },
        { syllable: 'lle', file: require('@assets/audio/levels/nivel2/audios_lesson2/lle.wav') },
        { syllable: 're', file: require('@assets/audio/levels/nivel2/audios_lesson2/ri.wav') },
    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => router.push('/(tabs)/Level2Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion2/lingualesA')}
                    // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/lingualesI')}

        /> 
    );
}