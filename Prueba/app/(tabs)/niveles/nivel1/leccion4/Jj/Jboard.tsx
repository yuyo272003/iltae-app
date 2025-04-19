import React from 'react';
import LetterScreenWithDrawing from '../../../../../../components/LetterScreenWithDrawing';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <LetterScreenWithDrawing
            imageSource={require('@assets/images/lecciones/nivel1/lessons/letterJ.png')}  // Aquí importas la imagen
            letterAudio={require('@assets/audio/lecciones/nivel1/intro.wav')}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/J/Jboard.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion4/Jj/Jlearn')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion4/Jj/Jsilabas')}

        />
    );
}