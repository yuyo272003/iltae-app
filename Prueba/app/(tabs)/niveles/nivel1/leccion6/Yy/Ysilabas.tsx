import React from 'react';
import SyllableScreen from '../../../../../../components/SyllableScreen';
import { router } from "expo-router";

export default function Leccion1() {
    return (
        <SyllableScreen
            letter="y"
            syllables={["ya", "ye", "yi", "yo", "yu"]}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/Y/Ysilabaslearn.wav')}
            syllablesAudio={require('@assets/audio/levels/nivel1/lessons/Y/Ysilabas.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion6/Yy/Ypalabra')}
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel1/leccion6/Yy/Yboard')}
        />
    );
}
