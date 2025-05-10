import React from 'react';
import SyllableScreen from '../../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {


    // @ts-ignore
    return (
        <SyllableScreen
            letter="cr"
            syllables={["cra", "cre", "cri", "cro", "cru"]}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson1/cr/CRlearn.wav')} // revisar
            syllablesAudio={require('@assets/audio/levels/nivel3/audios_lesson1/cr/CRsyllables.wav')} // revisar
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level3Screen')}
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/cl/CLpalabra')} // revisar
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion1/cr/CRboard')} // revisar
        />

    );
}