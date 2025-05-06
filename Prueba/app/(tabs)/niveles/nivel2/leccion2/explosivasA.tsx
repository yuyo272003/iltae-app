import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'ba', file: require('@assets/audio/levels/nivel2/audios_lesson2/ne.wav') },
        { syllable: 'da', file: require('@assets/audio/levels/nivel2/audios_lesson2/ñe.wav') },
        { syllable: 'pa', file: require('@assets/audio/levels/nivel2/audios_lesson2/ma.wav') },
        { syllable: 'ga', file: require('@assets/audio/levels/nivel2/audios_lesson2/na.wav') },
        { syllable: 'ta', file: require('@assets/audio/levels/nivel2/audios_lesson2/na.wav') },
        { syllable: 'ka', file: require('@assets/audio/levels/nivel2/audios_lesson2/na.wav') },
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