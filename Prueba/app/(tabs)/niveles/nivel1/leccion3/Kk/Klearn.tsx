import React from 'react';
import LetterScreen2 from '../../../../../../components/ConsonantScreen';
import {router} from "expo-router";

export default function Leccion2() {


    return (
        <LetterScreen2
            letter="Kk"
            letterAudio={require('@assets/audio/lecciones/nivel1/lessons/K/K.wav')}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/K/Klearn.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion3/Gg/Gpalabra')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion3/Kk/Kboard')}

        />
    );
}