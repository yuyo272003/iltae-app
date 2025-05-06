import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'fu', file: require('@assets/audio/levels/nivel2/audios_lesson2/fu.wav') },
        { syllable: 'ju', file: require('@assets/audio/levels/nivel2/audios_lesson2/ju.wav') },
        { syllable: 'zu', file: require('@assets/audio/levels/nivel2/audios_lesson2/zu.wav') },
        { syllable: 'su', file: require('@assets/audio/levels/nivel2/audios_lesson2/su.wav') },
        { syllable: 'xu', file: require('@assets/audio/levels/nivel2/audios_lesson2/xu.wav') },

    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => router.push('/(tabs)/Level2Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion2/aireO')}
                    // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/lingualesA')}

        /> 
    );
}