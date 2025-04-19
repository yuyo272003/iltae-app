import React from 'react';
import LetterScreen2 from '../../../../../../components/ConsonantScreen';
import { router } from "expo-router";

export default function Leccion2() {
    return (
        <LetterScreen2
            letter="Ww"
            letterAudio={require('@assets/audio/lecciones/nivel1/lessons/W/W.wav')}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/W/Wlearn.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion6/Vv/Vpalabra')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion6/Ww/Wboard')}
        />
    );
}
