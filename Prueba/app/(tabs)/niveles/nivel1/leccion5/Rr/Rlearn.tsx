import React from 'react';
import LetterScreen2 from '../../../../../../components/ConsonantScreen';
import {router} from "expo-router";

export default function Leccion2() {


    return (
        <LetterScreen2
            letter="Rr"
            letterAudio={require('@assets/audio/levels/nivel1/lessons/R/R.wav')}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/R/Rlearn.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion5/Ll/Llpalabra')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion5/Rr/Rboard')}

        />
    );
}