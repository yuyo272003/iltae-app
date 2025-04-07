import React from 'react';
import LetterScreen2 from '../../../../../components/LetterScreen2';
import {router} from "expo-router";

export default function Leccion2() {


    return (
        <LetterScreen2
            letter="Mm"
            letterAudio={require('@assets/audio/lecciones/nivel1/lessons/A/A2.wav')}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/A/a.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion2/leccion')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion2/Mboard')}

        />
    );
}