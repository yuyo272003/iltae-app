import React from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'bi', file: require('@assets/audio/levels/nivel2/audios_lesson2/bi.wav') },
        { syllable: 'di', file: require('@assets/audio/levels/nivel2/audios_lesson2/di.wav') },
        { syllable: 'pi', file: require('@assets/audio/levels/nivel2/audios_lesson2/pi.wav') },
        { syllable: 'gi', file: require('@assets/audio/levels/nivel2/audios_lesson2/gi.wav') },
        { syllable: 'ti', file: require('@assets/audio/levels/nivel2/audios_lesson2/ti.wav') },
        { syllable: 'ki', file: require('@assets/audio/levels/nivel2/audios_lesson2/ki.wav') },
    ];

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => router.push('/(tabs)/Level2Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion2/explosivasE')}
                    // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel2/leccion2/explosivasO')}

        /> 
    );
}