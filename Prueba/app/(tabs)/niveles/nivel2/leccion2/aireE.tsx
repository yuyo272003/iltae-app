import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'fe', file: require('@assets/audio/levels/nivel2/audios_lesson2/fe.wav') },
        { syllable: 'je', file: require('@assets/audio/levels/nivel2/audios_lesson2/je.wav') },
        { syllable: 'ze', file: require('@assets/audio/levels/nivel2/audios_lesson2/ze.wav') },
        { syllable: 'se', file: require('@assets/audio/levels/nivel2/audios_lesson2/se.wav') },
        { syllable: 'xe', file: require('@assets/audio/levels/nivel2/audios_lesson2/xe.wav') },

    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => router.push('/(tabs)/Level2Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion2/aireA')}
                    // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel2/leccion2/aireI')}

        /> 
    );
}