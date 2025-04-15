import React from 'react';
import LetterScreen2 from '../../../../../components/LetterScreen2';
import {router} from "expo-router";

export default function Leccion2() {


    return (
        <LetterScreen2
            letter="Ll"
            letterAudio={require('@assets/audio/lecciones/nivel1/lessons/L/L.wav')}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/L/Llearn.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion5/leccion')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion5/Lboard')}

        />
    );
}