import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'ma', file: require('@assets/audio/levels/nivel2/audios_lesson2/ma.wav') },
        { syllable: 'me', file: require('@assets/audio/levels/nivel2/audios_lesson2/me.wav') },
        { syllable: 'mi', file: require('@assets/audio/levels/nivel2/audios_lesson2/mi.wav') },
        { syllable: 'mo', file: require('@assets/audio/levels/nivel2/audios_lesson2/mo.wav') },
        { syllable: 'mu', file: require('@assets/audio/levels/nivel2/audios_lesson2/mu.wav') },
    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => {console.log("Navigating to /tabs/Level2Screen");router.push('/(tabs)/Level2Screen')}}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion2/firstScreen')}
                    // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/Dpractice')}

        /> 
    );
}