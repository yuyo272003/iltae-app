import React from 'react';
import SyllableScreen from '../../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {


    // @ts-ignore
    return (
        <SyllableScreen
            letter="dr"
            syllables={["dra", "dre", "dri", "dro", "dru"]}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson1/dr/DRlearn.wav')} // revisar
            syllablesAudio={require('@assets/audio/levels/nivel3/audios_lesson1/dr/DRsyllables.wav')} // revisar
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)/Level3Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion1/dr/DRboard')} // revisar
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/cr/CRpalabra')} // revisar
        />

    );
}