import React from 'react';
import SyllableScreen from '../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {


    // @ts-ignore
    return (
        <SyllableScreen
            letter="s"
            syllables={["sa", "se", "si", "so", "su"]}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/S/Ssilabaslearn.wav')}
            syllablesAudio={require('@assets/audio/lecciones/nivel1/lessons/S/Ssilabas.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion4/Spalabra')}
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel1/leccion4/Sboard')}
        />

    );
}