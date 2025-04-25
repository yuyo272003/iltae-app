import React from 'react';
import LetterScreenWithDrawing from'../../../../../../components/LetterScreenWithDrawing';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <LetterScreenWithDrawing
            imageSource={require('@assets/images/lecciones/nivel1/lessons/Qboard.png')}  // Aquí importas la imagen
            letterAudio={require('@assets/audio/levels/nivel1/intro.wav')}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/Q/Qboard.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion6/Qq/Qlearn')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion6/Qq/Qsilabas')}

        />
    );
}