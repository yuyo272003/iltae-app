import React from 'react';
import SyllableScreen from '../../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {
    // @ts-ignore
    return (
        <SyllableScreen
            letter="h"
            syllables={["ha", "he", "hi", "ho", "hu"]}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/H/Hsilabaslearn.wav')}
            syllablesAudio={require('@assets/audio/levels/nivel1/lessons/H/Hsilabas.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion6/Hh/Hpalabra')}
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel1/leccion6/Hh/Hboard')}
        />

    );
}