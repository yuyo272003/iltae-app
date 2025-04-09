import React from 'react';
import SyllableScreen from '../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {


    // @ts-ignore
    return (
        <SyllableScreen
            letter="d"
            syllables={["da", "de", "di", "do", "du"]}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/D/Dsilabaslearn.wav')}
            syllablesAudio={require('@assets/audio/lecciones/nivel1/lessons/D/Dsilabas.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion3/Dpalabra')}
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel1/leccion3/Dboard')}
        />

    );
}