import React from 'react';
import SyllableScreen from '../../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {


    // @ts-ignore
    return (
        <SyllableScreen
            letter="t"
            syllables={["ta", "te", "ti", "to", "tu"]}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/T/Tsilabaslearn.wav')}
            syllablesAudio={require('@assets/audio/levels/nivel1/lessons/T/Tsilabas.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion3/Tt/Tpalabra')}
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel1/leccion3/Tt/Tboard')}
        />

    );
}