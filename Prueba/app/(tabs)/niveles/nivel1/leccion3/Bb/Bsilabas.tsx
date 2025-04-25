import React from 'react';
import SyllableScreen from '../../../../../../components/SyllableScreen';
import {router} from "expo-router";

export default function Leccion1() {


    // @ts-ignore
    return (
        <SyllableScreen
            letter="b"
            syllables={["ba", "be", "bi", "bo", "bu"]}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/B/Bsilabaslearn.wav')}
            syllablesAudio={require('@assets/audio/levels/nivel1/lessons/B/Bsilabas.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion3/Bb/Bpalabra')}
            // @ts-ignore
            onBack={() => router.push('/(tabs)/niveles/nivel1/leccion3/Bb/Bboard')}
        />

    );
}