import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'mo', file: require('@assets/audio/levels/nivel2/audios_lesson2/mo.wav') },
        { syllable: 'no', file: require('@assets/audio/levels/nivel2/audios_lesson2/no.wav') },
        { syllable: 'ño', file: require('@assets/audio/levels/nivel2/audios_lesson2/ño.wav') },
    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => {console.log("Navigating to /tabs/Level2Screen");router.push('/(tabs)/Level2Screen')}}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion2/nasalesI')}
                    // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel2/leccion2/nasalesU')}

        /> 
    );
}