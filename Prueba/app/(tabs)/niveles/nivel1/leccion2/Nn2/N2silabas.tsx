import React from 'react';
import SyllableScreen from '../../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {


    // @ts-ignore
    return (
        <SyllableScreen
            letter="ñ"
            syllables={["ña", "ñe", "ñi", "ño", "ñu"]}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/Ñ/Ñsilabasinstruccion.wav')}
            syllablesAudio={require('@assets/audio/levels/nivel1/lessons/Ñ/Ñsilabas.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion2/Nn2/N2palabra')}
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel1/leccion2/Nn2/N2board')}
        />

    );
}