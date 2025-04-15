import React from 'react';
import SyllableScreen from '../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {


    // @ts-ignore
    return (
        <SyllableScreen
            letter="Ll"
            syllables={["Lla", "Lle", "Lli", "Llo", "Llu"]}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/L/Llsilabaslearn.wav')}
            syllablesAudio={require('@assets/audio/lecciones/nivel1/lessons/L/Llsilabas.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion5/Llpalabra')}
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel1/leccion5/Lpalabra')}
        />

    );
}