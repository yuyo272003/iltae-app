import React from 'react';
import SyllableScreen from '../../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {


    // @ts-ignore
    return (
        <SyllableScreen
            letter="fr"
            syllables={["fra", "fre", "fri", "fro", "fru"]}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson1/fr/FRlearn.wav')}
            syllablesAudio={require('@assets/audio/levels/nivel3/audios_lesson1/fr/FRsyllables.wav')} 
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level3Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion1/fr/FRboard')} 
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/fl/FLpalabra')} 
        />

    );
}