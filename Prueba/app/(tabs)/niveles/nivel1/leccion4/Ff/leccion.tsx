import React from 'react';
import LetterScreen2 from '../../../../../../components/FirstLetterScreenConsonants';
import {router} from "expo-router";

export default function Leccion2() {


    return (
        <LetterScreen2
            letter="Ff"
            letterAudio={require('@assets/audio/lecciones/nivel1/lessons/F/F.wav')}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/F/Flearn.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion4/Ff/Fboard')}

        />
    );
}