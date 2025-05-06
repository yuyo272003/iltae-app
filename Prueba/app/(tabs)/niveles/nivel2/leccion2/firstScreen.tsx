import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'ma', file: require('@assets/audio/levels/nivel2/audios_lesson2/ma.wav') },
        { syllable: 'na', file: require('@assets/audio/levels/nivel2/audios_lesson2/na.wav') },
        { syllable: 'ña', file: require('@assets/audio/levels/nivel2/audios_lesson2/ña.wav') },
    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => {console.log("Navigating to /tabs/Level2Screen");router.push('/(tabs)/Level2Screen')}}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion1/Dpractice')}
                    // @ts-ignore modificar la flecha
            onNext={() => router.push('/(tabs)/niveles/nivel2/leccion2/nasalesE')}

        /> 
    );
}