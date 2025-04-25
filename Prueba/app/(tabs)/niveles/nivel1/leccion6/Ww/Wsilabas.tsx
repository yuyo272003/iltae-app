import React from 'react';
import SyllableScreen from '../../../../../../components/SyllableScreen';
import { router } from "expo-router";

export default function Leccion1() {
    return (
        <SyllableScreen
            letter="w"
            syllables={["wa", "we", "wi", "wo", "wu"]}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/W/Wsilabaslearn.wav')}
            syllablesAudio={require('@assets/audio/levels/nivel1/lessons/W/Wsilabas.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion6/Ww/Wpalabra')}
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel1/leccion6/Ww/Wboard')}
        />
    );
}
