import React from 'react';
import SyllableScreen from '../../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {


    // @ts-ignore
    return (
        <SyllableScreen
            letter="l"
            syllables={["la", "le", "li", "lo", "lu"]}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/L/Lsilabaslearn.wav')}
            syllablesAudio={require('@assets/audio/levels/nivel1/lessons/L/Lsilabas.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion5/Ll/Lpalabra')}
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel1/leccion5/Ll/Lboard')}
        />

    );
}