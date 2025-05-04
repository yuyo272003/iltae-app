import React from 'react';
import WordDragGame from '../../../../../components/WordDragGame';
import { router } from 'expo-router';

export default function LeccionConMezcla() {
    return (
        <WordDragGame
            slides={[
                {
                    image: require('@assets/images/lecciones/nivel2/helado.png'),
                    word: [null, 'e', 'l', 'a', null, 'o'],
                    correctLetters: ['h', 'd'],
                    options: ['m', 'w', 'k', 'h', 'b', 'd'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel2/saxofon.png'),
                    word: ['s', null, 'x', 'o', null, 'ó', 'n'],
                    correctLetters: ['a', 'f'],
                    options: ['u', 'r', 'f', 'ñ', 'a', 't'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel2/serpiente.png'),
                    word: ['s', 'e', 'r', null, 'i', 'e', 'n', 't', null],
                    correctLetters: ['p', 'e'],
                    options: ['b', 'p', 'g', 'e', 'z', 'c'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel2/gorra.png'),
                    word: [null, 'o', null, 'r', 'a'],
                    correctLetters: ['g', 'r'],
                    options: ['b', 'g', 'k', 'p', 'r', 'd'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel2/reloj.png'),
                    word: [null, 'e', 'l', null, 'j'],
                    correctLetters: ['r', 'o'],
                    options: ['s', 'f', 't', 'w', 'o', 'r'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel2/naranja.png'),
                    word: ['n', 'a', 'r', null, 'n', 'j', null],
                    correctLetters: ['a', 'a'],
                    options: ['a', 'e', 'i', 'o', 'u', 'h'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel2/queso.png'),
                    word: ['q', 'u', null, 's', null],
                    correctLetters: ['e', 'o'],
                    options: ['e', 'o', 'i', 'u', 'x', 'c'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel2/jirafa.png'),
                    word: ['j', null, 'r', 'a', 'f', null],
                    correctLetters: ['i', 'a'],
                    options: ['i', 'a', 'e', 'o', 'u', 'b'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel2/violin.png'),
                    word: [null, 'i', 'o', 'l', 'í', 'n'],
                    correctLetters: ['v'],
                    options: ['v', 'b', 'w', 'm', 'f', 'g'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel2/pollo.png'),
                    word: ['p', null, 'l', 'l', null],
                    correctLetters: ['o', 'o'],
                    options: ['a', 'e', 'i', 'o', 'u', 'h'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel2/bicicleta.png'),
                    word: [null, 'i', null, 'i', null, 'l', 'e', 't', 'a'],
                    correctLetters: ['b', 'c', 'c'],
                    options: ['b', 'c', 's', 'h', 'ñ'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel2/sandwich.png'),
                    word: ['s', 'a', null, 'd', null, null, 'c', 'h'],
                    correctLetters: ['n','w', 'i'],
                    options: ['h', 'd', 'ñ', 'v', 'w', 's'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel2/zapato.png'),
                    word: ['z', '', 'p', '', null, 'o'],
                    correctLetters: ['a', 'a', 't'],
                    options: ['h', 'z', 't', 'j', 's', 'f'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                }
            ]}
            onFinish={() => console.log('Juego terminado')}
            firstSlideBackRoute="/(tabs)/niveles/nivel2/leccion1/Zpractice" // recuerda cambiar esta línea por la lección 2 
            lastSlideNextRoute="/(tabs)/niveles/nivel1/leccion2/Inicio"
            advanceEndpoint="/progreso/avanzar-leccion-1"
            onTopBack={() => router.push('/(tabs)/niveles')}
        />
    );
}
