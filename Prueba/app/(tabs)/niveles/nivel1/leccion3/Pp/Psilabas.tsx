import React from 'react';
import SyllableScreen from '../../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {


    // @ts-ignore
    return (
        <SyllableScreen
            letter="p"
            syllables={["pa", "pe", "pi", "po", "pu"]}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/P/Psilabaslearn.wav')}
            syllablesAudio={require('@assets/audio/levels/nivel1/lessons/P/Psilabas.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion3/Pp/Ppalabra')}
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel1/leccion3/Pp/Pboard')}
        />

    );
}