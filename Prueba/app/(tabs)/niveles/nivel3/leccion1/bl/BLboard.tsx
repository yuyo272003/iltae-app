import React from 'react';
import LetterScreenWithDrawing from '../../../../../../components/ConsonantsScreenWithDrawing';
import { router } from "expo-router";

export default function Leccion1() {
    // El componente espera un array de imágenes, no una sola imagen
    const imageSourcesArray = [
        require('@assets/images/lecciones/nivel3/leccion1/bl/BLmayusc.png'),
        require('@assets/images/lecciones/nivel3/leccion1/bl/BLminusc.png'),
    ];

    return (
        <LetterScreenWithDrawing
            imageSources={imageSourcesArray}  // Cambiado de imageSource a imageSources y pasando un array
            letterAudio={require('@assets/audio/levels/nivel1/intro.wav')}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson1/bl/BLboard.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level3Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/bl/firstScreen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion1/bl/BLpalabra')}
        />
    );
}