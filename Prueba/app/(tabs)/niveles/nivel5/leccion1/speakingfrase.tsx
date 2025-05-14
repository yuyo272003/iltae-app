import React from 'react';
import {router} from "expo-router";
import SentenceSpeakingScreen from "@/components/SentenceSpeakingScreen";

export default function Leccion2() {


    return (
        <SentenceSpeakingScreen
            words={['El', 'globo', 'rojo', 'es']}
            targetPhrase="El globo rojo es"
            practiceAudio={require('@assets/audio/Todos.wav')}
            successAudio={require('@assets/audio/Todos.wav')}
            failureAudio={require('@assets/audio/Todos.wav')}
            onNext={() => router.push('/(tabs)/niveles/nivel5/leccion1/speakingfrase')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel5/leccion1/pizarron')}
            onTopBack={() => router.push('/(tabs)/Level5Screen')}
        />


    );

}
