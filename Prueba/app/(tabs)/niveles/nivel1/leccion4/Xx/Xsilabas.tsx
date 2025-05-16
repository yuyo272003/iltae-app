import React from 'react';
import SyllableScreen from '../../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {


    // @ts-ignore
    return (
        <SyllableScreen
            letter="x"
            syllables={["xa", "xe", "xi", "xo", "xu"]}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/X/Xsilabaslearn.wav')}
            syllablesAudio={require('@assets/audio/levels/nivel1/lessons/X/Xsilabas.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion4/Xx/Xpalabra')}
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel1/leccion4/Xx/Xboard')}
        />

    );
}