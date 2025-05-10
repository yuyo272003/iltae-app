import React from 'react';
import SyllableScreen from '../../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {

    // @ts-ignore
    return (
        <SyllableScreen
            letter="cl"
            syllables={["cla", "cle", "cli", "clo", "clu"]}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson1/cl/CLlearn.wav')} // revisar
            syllablesAudio={require('@assets/audio/levels/nivel3/audios_lesson1/cl/CLsyllables.wav')} // revisar
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level3Screen')}
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/ch/CHpalabra')} // revisar
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion1/cl/CLboard')} // revisar
        />
    );
}