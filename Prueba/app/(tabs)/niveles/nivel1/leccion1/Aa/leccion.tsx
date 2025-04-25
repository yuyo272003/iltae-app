import React from 'react';
import LetterScreen from '../../../../../../components/FirstLetterScreen';
import {router} from "expo-router";

export default function Leccion2() {


    return (
        <LetterScreen
            letter="Aa"
            letterAudio={require('@assets/audio/levels/nivel1/lessons/A/A2.wav')}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/A/a.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion1/Aa/Aboard')}

        />
    );
}