import React from 'react';
import LetterScreen from '../../../../../components/LetterScreen';
import {router} from "expo-router";

export default function Leccion2() {
    return (
        <LetterScreen
            letter="Uu"
            letterAudio={require('@assets/audio/lecciones/nivel1/lessons/U/u.wav')}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/U/Ulearn.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion1/Oboard')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion1/Uboard')}
        />
    );
}