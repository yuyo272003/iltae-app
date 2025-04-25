import React from 'react';
import SyllableScreen from '../../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {

// FALTA EL AUDIO DE LA SILABAS

    // @ts-ignore
    return (
        <SyllableScreen
            letter="c"
            syllables={["ca", "ce", "ci", "co", "cu"]}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/C/Csilabaslearn.wav')}
            syllablesAudio={require('@assets/audio/levels/nivel1/lessons/B/Bsilabas.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion6/Cc/Cpalabra')}
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel1/leccion6/Cc/Cboard')}
        />

    );
}