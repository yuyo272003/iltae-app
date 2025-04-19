import React from 'react';
import SyllableScreen from '../../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {
    // @ts-ignore
    return (
        <SyllableScreen
            letter="q"
            syllables={["que", "qui"]}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/Q/Qsilabaslearn.wav')}
            syllablesAudio={require('@assets/audio/lecciones/nivel1/lessons/Q/Qsilabas.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion6/Qq/Qpalabra')}
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel1/leccion6/Qq/Qboard')}
        />

    );
}