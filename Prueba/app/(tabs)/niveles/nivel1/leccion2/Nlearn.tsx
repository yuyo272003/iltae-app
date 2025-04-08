import React from 'react';
import LetterScreen2 from '../../../../../components/LetterScreen2';
import {router} from "expo-router";

export default function Leccion2() {


    return (
        <LetterScreen2
            letter="Nn"
            letterAudio={require('@assets/audio/lecciones/nivel1/lessons/N/N.wav')}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/N/Nlearn.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion2/Mpalabra')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion2/Nboard')}

        />
    );
}