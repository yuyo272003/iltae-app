import React from 'react';
import SyllableScreen from '../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {


    // @ts-ignore
    return (
        <SyllableScreen
            letter="k"
            syllables={["ka", "ke", "ki", "ko", "ku"]}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/K/Ksilabaslearn.wav')}
            syllablesAudio={require('@assets/audio/lecciones/nivel1/lessons/K/Ksilabas.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion3/Kpalabra')}
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel1/leccion3/Kboard')}
        />

    );
}