import React from 'react';
import LetterScreen from '../../../../../../components/LetterScreen';
import {router} from "expo-router";

export default function Leccion2() {
    return (
        <LetterScreen
            letter="Ee"
            letterAudio={require('@assets/audio/levels/nivel1/lessons/E/e2.wav')}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/E/e.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion1/Aa/Aboard')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion1/Ee/Eboard')}
        />
    );
}
