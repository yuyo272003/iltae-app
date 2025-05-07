import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'fa', file: require('@assets/audio/levels/nivel2/audios_lesson2/fa.wav') },
        { syllable: 'ja', file: require('@assets/audio/levels/nivel2/audios_lesson2/ja.wav') },
        { syllable: 'za', file: require('@assets/audio/levels/nivel2/audios_lesson2/za.wav') },
        { syllable: 'sa', file: require('@assets/audio/levels/nivel2/audios_lesson2/sa.wav') },
        { syllable: 'xa', file: require('@assets/audio/levels/nivel2/audios_lesson2/xa.wav') },

    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => router.push('/(tabs)/Level2Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion2/explosivasU')}
                    // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel2/leccion2/aireE')}

        /> 
    );
}