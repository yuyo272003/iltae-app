import React from 'react';
import SyllableScreen from '../../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {


    // @ts-ignore
    return (
        <SyllableScreen
            letter="j"
            syllables={["ja", "je", "ji", "jo", "ju"]}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/J/Jsilabaslearn.wav')}
            syllablesAudio={require('@assets/audio/levels/nivel1/lessons/J/Jsilabas.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion4/Jj/Jpalabra')}
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel1/leccion4/Jj/Jboard')}
        />

    );
}