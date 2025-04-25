import React from 'react';
import LetterScreen2 from '../../../../../../components/ConsonantScreen';
import {router} from "expo-router";

export default function Leccion2() {


    return (
        <LetterScreen2
            letter="Zz"
            letterAudio={require('@assets/audio/levels/nivel1/lessons/Z/Z.wav')}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/Z/Zlearn.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion4/Xx/Xpalabra')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion4/Zz/Zboard')}

        />
    );
}