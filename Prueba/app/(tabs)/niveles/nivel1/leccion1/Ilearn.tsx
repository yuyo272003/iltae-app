import React from 'react';
import LetterScreen from '../../../../../components/LetterScreen';
import {router} from "expo-router";

export default function Leccion2() {
    return (
        <LetterScreen
            letter="Ii"
            letterAudio={require('@assets/audio/lecciones/nivel1/lessons/I/i.wav')}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/I/Ilearn.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion1/Eboard')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion1/Iboard')}
        />
    );
}