import React from 'react';
import LetterScreen2 from '../../../../../../components/FirstLetterScreenConsonants';
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
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion5/Ll/Lboard')}

        />
    );
}