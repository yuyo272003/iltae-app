import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'ce', file: require('@assets/audio/levels/nivel2/audios_lesson2/ce.wav') },
        { syllable: 'hi', file: require('@assets/audio/levels/nivel2/audios_lesson2/hi.wav') },
        { syllable: 'yi', file: require('@assets/audio/levels/nivel2/audios_lesson2/yi.wav') },
        { syllable: 'wi', file: require('@assets/audio/levels/nivel2/audios_lesson2/wi.wav') },
    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => router.push('/(tabs)/Level2Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion2/especialesA')}
                    // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/especialesI')}

        /> 
    );
}