import React from 'react';
import SyllableScreen from '../../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {


    // @ts-ignore
    return (
        <SyllableScreen
            letter="br"
            syllables={["bra", "bre", "bri", "bro", "bru"]}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson1/br/BRlearn.wav')} // revisar
            syllablesAudio={require('@assets/audio/levels/nivel3/audios_lesson1/br/BRsyllables.wav')} // revisar
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level3Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion1/br/BRboard')} // revisar
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/bl/BLpalabra')} 
        />

    );
}