import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'fo', file: require('@assets/audio/levels/nivel2/audios_lesson2/fo.wav') },
        { syllable: 'jo', file: require('@assets/audio/levels/nivel2/audios_lesson2/jo.wav') },
        { syllable: 'zo', file: require('@assets/audio/levels/nivel2/audios_lesson2/zo.wav') },
        { syllable: 'so', file: require('@assets/audio/levels/nivel2/audios_lesson2/so.wav') },
        { syllable: 'xo', file: require('@assets/audio/levels/nivel2/audios_lesson2/xo.wav') },

    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => router.push('/(tabs)/Level2Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion2/aireI')}
                    // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/aireU')}

        /> 
    );
}