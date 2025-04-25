import React from 'react';
import WordDragGame from '../../../../../components/WordDragGame';
import {router} from "expo-router";

export default function Leccion1() {
    // @ts-ignore

    return (
        <WordDragGame
            slides={[
                {
                    image: require('@assets/images/lecciones/nivel1/lessons/hueso.png'),
                    word: [null, 'u','e', 's', 'o'],
                    correctLetters: ['h'],
                    options: ['h', 'w', 'y', 'c', 'q', 'v'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel1/lessons/playa.png'),
                    word: ['p', 'l', 'a', null, 'a'],
                    correctLetters: ['y'],
                    options: ['h', 'w', 'y', 'c', 'q', 'v'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel1/lessons/vestido.png'),
                    word: [null, 'e', 's', 't', 'i', 'd', 'o'],
                    correctLetters: ['v'],
                    options: ['h', 'w', 'y', 'c', 'q', 'v'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
            ]}
            onFinish={() => console.log('Juego terminado')}
            firstSlideBackRoute="/(tabs)/niveles/nivel1/leccion6/Yy/Ypalabra" // Custom route for back button on first slide
            lastSlideNextRoute="/(tabs)/Level1Screen"
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
        />


    );
}