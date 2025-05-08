import React from 'react';
import SyllableScreen from '../../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {


    // @ts-ignore
    return (
        <SyllableScreen
            letter="bl"
            syllables={["bla", "ble", "bli", "blo", "blu"]}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/M/Msilabaslearn.wav')} // revisar
            syllablesAudio={require('@assets/audio/levels/nivel1/lessons/M/Msilabas.wav')} // revisar
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level3Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion1/ch/CHpalabra')} // revisar
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/cl/CLboard')} // revisar
        />

    );
}