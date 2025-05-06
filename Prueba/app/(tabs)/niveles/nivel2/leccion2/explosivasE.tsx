import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'be', file: require('@assets/audio/levels/nivel2/audios_lesson2/ne.wav') },
        { syllable: 'de', file: require('@assets/audio/levels/nivel2/audios_lesson2/ñe.wav') },
        { syllable: 'pe', file: require('@assets/audio/levels/nivel2/audios_lesson2/ma.wav') },
        { syllable: 'ge', file: require('@assets/audio/levels/nivel2/audios_lesson2/na.wav') },
        { syllable: 'te', file: require('@assets/audio/levels/nivel2/audios_lesson2/na.wav') },
        { syllable: 'ke', file: require('@assets/audio/levels/nivel2/audios_lesson2/na.wav') },
    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => router.push('/(tabs)/Level2Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion2/explosivasA')}
                    // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel2/leccion2/explosivasI')}

        /> 
    );
}