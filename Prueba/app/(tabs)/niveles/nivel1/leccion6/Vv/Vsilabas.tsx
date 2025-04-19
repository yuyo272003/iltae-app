import React from 'react';
import SyllableScreen from '../../../../../../components/SyllableScreen';
import { router } from "expo-router";

export default function Leccion1() {
    return (
        <SyllableScreen
            letter="v"
            syllables={["va", "ve", "vi", "vo", "vu"]}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/V/Vsilabaslearn.wav')}
            syllablesAudio={require('@assets/audio/lecciones/nivel1/lessons/V/Vsilabas.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion6/Vv/Vpalabra')}
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel1/leccion6/Vv/Vboard')}
        />
    );
}
