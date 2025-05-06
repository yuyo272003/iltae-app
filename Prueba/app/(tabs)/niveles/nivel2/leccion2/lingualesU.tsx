import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'lu', file: require('@assets/audio/levels/nivel2/audios_lesson2/lu.wav') },
        { syllable: 'llu', file: require('@assets/audio/levels/nivel2/audios_lesson2/llu.wav') },
        { syllable: 'ru', file: require('@assets/audio/levels/nivel2/audios_lesson2/ru.wav') },
    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => router.push('/(tabs)/Level2Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion2/lingualesO')}
                    // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/especialesA')}

        /> 
    );
}