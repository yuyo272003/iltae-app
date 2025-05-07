import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'fi', file: require('@assets/audio/levels/nivel2/audios_lesson2/fi.wav') },
        { syllable: 'ji', file: require('@assets/audio/levels/nivel2/audios_lesson2/ji.wav') },
        { syllable: 'zi', file: require('@assets/audio/levels/nivel2/audios_lesson2/zi.wav') },
        { syllable: 'si', file: require('@assets/audio/levels/nivel2/audios_lesson2/si.wav') },
        { syllable: 'xi', file: require('@assets/audio/levels/nivel2/audios_lesson2/xi.wav') },

    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => router.push('/(tabs)/Level2Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion2/aireE')}
                    // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel2/leccion2/aireO')}

        /> 
    );
}