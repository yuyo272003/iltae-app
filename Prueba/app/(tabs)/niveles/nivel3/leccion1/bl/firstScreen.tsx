import React from 'react';
import SyllableScreen from '../../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {


    // @ts-ignore
    return (
        <SyllableScreen
            letter="bl"
            syllables={["bla", "ble", "bli", "blo", "blu"]}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson1/bl/BLsyllableslearn.wav')}
            syllablesAudio={require('@assets/audio/levels/nivel3/audios_lesson1/bl/BLsyllables.wav')} 
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level3Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion2/Mm/Mpalabra')} // revisar
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/bl/BLboard')}
        />

    );
}