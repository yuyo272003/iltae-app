import React from 'react';
import LetterScreen from '../../../../../components/LetterScreen';
import {router} from "expo-router";

export default function Leccion2() {


    return (
        <LetterScreen
            letter="Aa"
            letterAudio={require('@assets/audio/lecciones/nivel1/lessons/A/A2.wav')}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/A/a.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion1/leccion')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion1/Aboard')}

        />
    );
}