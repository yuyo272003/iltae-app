import React from 'react';
import SyllableScreen from '../../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {


    // @ts-ignore
    return (
        <SyllableScreen
            letter="pl"
            syllables={["pla", "ple", "pli", "plo", "plu"]}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson1/pl/PLlearn.wav')} 
            syllablesAudio={require('@assets/audio/levels/nivel3/audios_lesson1/pl/PLsyllables.wav')} 
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level3Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion1/pl/PLboard')} 
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/gr/GRpalabra')} 
        />

    );
}