import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'li', file: require('@assets/audio/levels/nivel2/audios_lesson2/li.wav') },
        { syllable: 'lli', file: require('@assets/audio/levels/nivel2/audios_lesson2/lli.wav') },
        { syllable: 'ri', file: require('@assets/audio/levels/nivel2/audios_lesson2/ri.wav') },
    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => router.push('/(tabs)/Level2Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion2/lingualesE')}
                    // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel2/leccion2/lingualesO')}

        /> 
    );
}