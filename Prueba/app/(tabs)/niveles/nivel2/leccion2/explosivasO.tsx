import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'bo', file: require('@assets/audio/levels/nivel2/audios_lesson2/bo.wav') },
        { syllable: 'do', file: require('@assets/audio/levels/nivel2/audios_lesson2/do.wav') },
        { syllable: 'po', file: require('@assets/audio/levels/nivel2/audios_lesson2/po.wav') },
        { syllable: 'go', file: require('@assets/audio/levels/nivel2/audios_lesson2/go.wav') },
        { syllable: 'to', file: require('@assets/audio/levels/nivel2/audios_lesson2/to.wav') },
        { syllable: 'ko', file: require('@assets/audio/levels/nivel2/audios_lesson2/ko.wav') },
    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => router.push('/(tabs)/Level2Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion2/explosivasI')}
                    // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel2/leccion2/explosivasU')}

        /> 
    );
}