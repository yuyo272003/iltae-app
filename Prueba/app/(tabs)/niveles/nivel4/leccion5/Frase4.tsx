import React from 'react';
import {router} from "expo-router";
import SentenceSpeakingScreen from "@/components/SentenceSpeakingScreen";

export default function Leccion2() {


    return (
        <SentenceSpeakingScreen
            words={[ 'pan', 'niño', 'come','el']}
            targetPhrase="El niño come pan"
            practiceAudio={require('@assets/audio/levels/nivel4/audioLeccion5.wav')}
            successAudio={require('@assets/audio/levels/nivel4/correcto.wav')}
            failureAudio={require('@assets/audio/levels/nivel4/fallo.wav')}
            onNext={() => router.push('/(tabs)/niveles/nivel4/leccion5/Frase5')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel4/leccion5/Frase3')}
            onTopBack={() => router.push('/(tabs)/Level4Screen')}
        />


    );

}