import React from 'react';
import LetterScreen2 from '../../../../../../components/ConsonantScreen';
import { router } from "expo-router";

export default function Leccion2() {
    return (
        <LetterScreen2
            letter="Yy"
            letterAudio={require('@assets/audio/levels/nivel1/lessons/Y/Y.wav')}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/Y/Ylearn.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion6/Hh/Hpalabra')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion6/Yy/Yboard')}
        />
    );
}
