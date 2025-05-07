import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'ca', file: require('@assets/audio/levels/nivel2/audios_lesson2/ca.wav') },
        { syllable: 'ha', file: require('@assets/audio/levels/nivel2/audios_lesson2/ha.wav') },
        { syllable: 'ya', file: require('@assets/audio/levels/nivel2/audios_lesson2/ya.wav') },
        { syllable: 'wa', file: require('@assets/audio/levels/nivel2/audios_lesson2/wa.wav') },
    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => router.push('/(tabs)/Level2Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion2/lingualesU')}
                    // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel2/leccion2/especialesE')}

        /> 
    );
}