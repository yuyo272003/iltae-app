import React from 'react';
import SyllableScreen from '../../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {


    // @ts-ignore
    return (
        <SyllableScreen
            letter="ch"
            syllables={["cha", "che", "chi", "cho", "chu"]}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson1/ch/CHlearn.wav')} // revisar
            syllablesAudio={require('@assets/audio/levels/nivel3/audios_lesson1/ch/CHsyllables.wav')} // revisar
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level3Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion1/ch/CHboard')} // revisar
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/br/BRpalabra')} // revisar
        />

    );
}