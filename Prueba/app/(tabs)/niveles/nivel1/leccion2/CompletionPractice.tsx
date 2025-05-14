import React from 'react';
import WordDragGame from '../../../../../components/WordDragGame';
import {router} from "expo-router";

export default function Leccion1() {
    // @ts-ignore

    return (
        <WordDragGame
            slides={[
                {
                    image: require('@assets/images/lecciones/nivel1/lessons/mono.png'),
                    word: [null, 'o', null, 'o'],
                    correctLetters: ['m', 'n'],
                    options: ['m', 'n', 'ñ'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel1/lessons/niño.png'),
                    word: [null, 'i', null, 'a'],
                    correctLetters: ['n', 'ñ'],
                    options: ['m', 'n', 'ñ'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel1/lessons/mama.png'),
                    word: [null, 'a', null, 'á'],
                    correctLetters: ['m', 'm'],
                    options: ['m', 'n', 'ñ'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
            ]}
            onFinish={() => console.log('Juego terminado')}
            firstSlideBackRoute="/(tabs)/niveles/nivel1/leccion2/Nn2/N2palabra" // Custom route for back button on first slide
            lastSlideNextRoute="/(tabs)/Level1Screen"
            advanceEndpoint="/progreso/avanzar-leccion-2"
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
        />


    );
}