import React from 'react';
import {router} from "expo-router";
import PracticeWordsScreen from "@/components/WordAudioScreen";
import WordAccentScreen from "@/components/WordAccentScreen";

export default function Leccion2() {

    return (
        <WordAccentScreen
            word="arbol"
            letterAudio={require('@assets/audio/Todos.wav')}
            practiceAudio={require('@assets/audio/Todos.wav')}
            onTopBack={() => router.push('/(tabs)/Level5Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel5/leccion1/letras')}
            onNext={() => router.push('/(tabs)/niveles/nivel5/leccion1/speakingfrase')}
        />


    );

}
