import React from 'react';
import LetterScreenWithDrawing from '../../../../../../components/LetterScreenWithDrawing';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <LetterScreenWithDrawing
            imageSource={require('@assets/images/lecciones/nivel1/lessons/letterM.png')}  // revisar
            letterAudio={require('@assets/audio/levels/nivel1/intro.wav')}// revisar
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/M/Mboard.wav')}// revisar
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level3Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/bl/firstScreen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion1/bl/BLpalabra')}

        />
    );
}