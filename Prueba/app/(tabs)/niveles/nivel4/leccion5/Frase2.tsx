import React from 'react';
import {router} from "expo-router";
import SentenceSpeakingScreen from "@/components/SentenceSpeakingScreen";

export default function Leccion2() {


    return (
        <SentenceSpeakingScreen
            words={['me', 'mima', 'mamá', 'mi']}
            targetPhrase="Mi mamá me mima"
            practiceAudio={require('@assets/audio/levels/nivel4/instruccion5.wav')}
            successAudio={require('@assets/audio/levels/nivel4/correcto.wav')}
            failureAudio={require('@assets/audio/levels/nivel4/fallo.wav')}
            onNext={() => router.push('/(tabs)/niveles/nivel4/leccion5/Frase3')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel4/leccion5/firstScreen')}
            onTopBack={() => router.push('/(tabs)/Level4Screen')}
        />


    );

}