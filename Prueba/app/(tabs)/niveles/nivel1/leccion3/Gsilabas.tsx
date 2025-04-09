import React from 'react';
import SyllableScreen from '../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {


    // @ts-ignore
    return (
        <SyllableScreen
            letter="g"
            syllables={["ga", "ge", "gi", "go", "gu"]}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/G/Gsilabaslearn.wav')}
            syllablesAudio={require('@assets/audio/lecciones/nivel1/lessons/G/Gsilabas.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion3/Gpalabra')}
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel1/leccion3/Gboard')}
        />

    );
}