import React from 'react';
import SyllableScreen from '../../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {

    // @ts-ignore
    return (
        <SyllableScreen
            letter="fl"
            syllables={["fla", "fle", "fli", "flo", "flu"]}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson1/fl/FLlearn.wav')} // revisar
            syllablesAudio={require('@assets/audio/levels/nivel3/audios_lesson1/fl/FLsyllables.wav')} // revisar
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level3Screen')}
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/dr/DRpalabra')} // revisar
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion1/fl/FLboard')} // revisar
        />
    );
}