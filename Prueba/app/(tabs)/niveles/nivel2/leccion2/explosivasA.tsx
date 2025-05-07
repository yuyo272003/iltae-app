import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'ba', file: require('@assets/audio/levels/nivel2/audios_lesson2/ba.wav') },
        { syllable: 'da', file: require('@assets/audio/levels/nivel2/audios_lesson2/da.wav') },
        { syllable: 'pa', file: require('@assets/audio/levels/nivel2/audios_lesson2/pa.wav') },
        { syllable: 'ga', file: require('@assets/audio/levels/nivel2/audios_lesson2/ga.wav') },
        { syllable: 'ta', file: require('@assets/audio/levels/nivel2/audios_lesson2/ta.wav') },
        { syllable: 'ka', file: require('@assets/audio/levels/nivel2/audios_lesson2/ka.wav') },
    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => router.push('/(tabs)/Level2Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion2/nasalesU')}
                    // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel2/leccion2/explosivasE')}

        /> 
    );
}