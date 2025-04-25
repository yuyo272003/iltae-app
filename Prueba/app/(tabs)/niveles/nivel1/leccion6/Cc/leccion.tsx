import React from 'react';
import LetterScreen2 from '../../../../../../components/FirstLetterScreenConsonants';
import {router} from "expo-router";

export default function Leccion2() {


    return (
        <LetterScreen2
            letter="Cc"
            letterAudio={require('@assets/audio/levels/nivel1/lessons/C/C.wav')}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/C/Clearn.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion6/Cc/Cboard')}

        />
    );
}