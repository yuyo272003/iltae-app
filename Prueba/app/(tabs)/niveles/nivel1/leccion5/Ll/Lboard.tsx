import React from 'react';
import LetterScreenWithDrawing from '../../../../../../components/LetterScreenWithDrawing';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <LetterScreenWithDrawing
            imageSource={require('@assets/images/lecciones/nivel1/lessons/letterL.png')}  // Aquí importas la imagen
            letterAudio={require('@assets/audio/lecciones/nivel1/intro.wav')}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/L/Lboard.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion5/Ll/leccion')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion5/Ll/Lsilabas')}

        />
    );
}