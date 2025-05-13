import React from 'react';
import {router} from "expo-router";
import PracticeSyllablesScreen from "@/components/PracticeSyllablesProps";

export default function Leccion2() {


    return (    <PracticeSyllablesScreen
            syllables={[
                { text: 'te', audio: require('@assets/audio/Todos.wav') },
                { text: 'lé', audio: require('@assets/audio/Todos.wav') },
                { text: 'fo', audio: require('@assets/audio/Todos.wav') },
                { text: 'no', audio: require('@assets/audio/Todos.wav') },
            ]}
            practiceAudio={require('@assets/audio/Todos.wav')}
            onTopBack={() => router.push('/(tabs)/Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles/nivel1/leccion1/firstScreen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion1/siguiente')}
        />

    );

}

