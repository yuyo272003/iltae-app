import React from 'react';
import LetterScreen2 from '../../../../../../components/ConsonantScreen';
import { router } from "expo-router";

export default function Leccion2() {
    return (
        <LetterScreen2
            letter="Vv"
            letterAudio={require('@assets/audio/levels/nivel1/lessons/V/V.wav')}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/V/Vlearn.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion6/Qq/Qpalabra')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion6/Vv/Vboard')}
        />
    );
}
