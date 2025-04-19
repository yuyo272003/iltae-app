import React from 'react';
import LetterScreen2 from '../../../../../../components/ConsonantScreen';
import {router} from "expo-router";

export default function Leccion2() {


    return (
        <LetterScreen2
            letter="Pp"
            letterAudio={require('@assets/audio/lecciones/nivel1/lessons/P/P.wav')}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/P/Plearn.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion3/Kk/Kpalabra')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion3/Pp/Pboard')}

        />
    );
}