import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'bu', file: require('@assets/audio/levels/nivel2/audios_lesson2/bu.wav') },
        { syllable: 'du', file: require('@assets/audio/levels/nivel2/audios_lesson2/du.wav') },
        { syllable: 'pu', file: require('@assets/audio/levels/nivel2/audios_lesson2/pu.wav') },
        { syllable: 'gu', file: require('@assets/audio/levels/nivel2/audios_lesson2/gu.wav') },
        { syllable: 'tu', file: require('@assets/audio/levels/nivel2/audios_lesson2/tu.wav') },
        { syllable: 'ku', file: require('@assets/audio/levels/nivel2/audios_lesson2/ku.wav') },
    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => router.push('/(tabs)/Level2Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion2/explosivasO')}
                    // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/aireA')}

        /> 
    );
}