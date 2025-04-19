import React from 'react';
import WordDragGame from '../../../../../components/WordDragGame';
import { router } from "expo-router";

export default function Leccion1() {
    const handleTopBack = () => {
        router.push('/(tabs)/Level1Screen');
    };

    return (
        <WordDragGame
            slides={[
                {
                    image: require('@assets/images/lecciones/nivel1/lessons/perro.png'),
                    word: ['p','e',null,'o'],
                    correctLetters: ['rr'],
                    options: ['l','rr','ll','r'],
                    audio: require('@assets/audio/lecciones/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel1/lessons/raqueta.png'),
                    word: [null, 'a','q','u','e','t','a'],
                    correctLetters: ['r'],
                    options: ['l','rr','ll','r'],
                    audio: require('@assets/audio/lecciones/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel1/lessons/ballena.png'),
                    word: ['b','a',null,'e','n','a'],
                    correctLetters: ['ll'],
                    options: ['l','rr','ll','r'],
                    audio: require('@assets/audio/lecciones/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },                {
                    image: require('@assets/images/lecciones/nivel1/lessons/colores.png'),
                    word: ['c','o',null,'o','r','e','s'],
                    correctLetters: ['l'],
                    options: ['l','rr','ll','r'],
                    audio: require('@assets/audio/lecciones/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },


            ]}
            onFinish={() => console.log('Juego terminado')}
            firstSlideBackRoute="/(tabs)/niveles/nivel1/leccion5/Rr/Rrpalabra"
            lastSlideNextRoute="/(tabs)/Level1Screen"
            onTopBack={handleTopBack}
        />
    );
}