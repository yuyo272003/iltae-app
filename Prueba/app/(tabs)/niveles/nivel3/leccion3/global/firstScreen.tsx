import React from 'react';
import WordDragGame from '../../../../../../components/WordDragGame';
import { router } from 'expo-router';

export default function LeccionConMezcla() {
    return (
        <WordDragGame
            slides={[
                {
                    image: require('@assets/images/lecciones/nivel3/leccion1/bl/establo.png'),
                    word: [null, 's', 't', 'a', null, null, 'o'],
                    correctLetters: ['e', 'b', 'l'],
                    options: ['p', 'l', 'b', 'e', 'g', 'd'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel3/leccion1/br/libreta.png'),
                    word: ['l', null, 'b', null, 'e', 't', null],
                    correctLetters: ['i', 'r', 'a'],
                    options: ['b', 'r', 'f', 'u', 'a', 'i'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel3/leccion1/ch/chaleco.png'),
                    word: [null, null, 'a', 'l', 'e', 'c', 'o'],
                    correctLetters: ['c', 'h'],
                    options: ['b', 'g', 'h', 'p', 'r', 'c'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel3/leccion1/cl/eclipse.png'),
                    word: ['e', null, 'l', 'i', 'p', 's', null],
                    correctLetters: ['c', 'e'],
                    options: ['e', 'c', 't', 'w', 'o', 'r'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel3/leccion1/fl/flecha.png'),
                    word: [null, null, 'e', null, null, 'a'],
                    correctLetters: ['f', 'l', 'c', 'h'],
                    options: ['a', 'f', 'i', 'h', 'c', 'l'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel3/leccion1/cr/cruz.png'),
                    word: [null, null, 'u', 'z'],
                    correctLetters: ['c', 'r'],
                    options: ['e', 'r', 'i', 'l', 'g', 'c'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel3/leccion1/fr/frutas.png'),
                    word: [null, null, 'u', 't', 'a', null],
                    correctLetters: ['f', 'r','s'],
                    options: ['r', 'b', 'p', 't', 's', 'f'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel3/leccion1/gl/iglesia.png'),
                    word: ['i', null, null, 'e', 's', null, 'a'],
                    correctLetters: ['g','l', 'i'],
                    options: ['g', 'b', 'r', 'l', 'f', 'i'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel3/leccion1/tr/trofeo.png'),
                    word: [null, null, 'o', null, 'e', 'o'],
                    correctLetters: ['t', 'r', 'f'],
                    options: ['h', 'c', 't', 'j', 'r', 'f', 'r', 'l'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel3/leccion1/gr/cangrejo.png'),
                    word: ['c', 'a', null, null, null, 'e', 'j', 'o'],
                    correctLetters: ['n', 'g', 'r'],
                    options: ['c', 'n', 'p', 'g', 'r', 'l'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel3/leccion1/pl/pluma.png'),
                    word: [null, null, null, null, null],
                    correctLetters: ['p', 'l', 'u', 'm', 'a'],
                    options: ['m', 'p', 'a', 'l', 'u'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel3/leccion1/pr/precio.png'),
                    word: [null, null, 'e', 'c', null, 'o'],
                    correctLetters: ['p','r', 'i'],
                    options: ['h', 'p', 'ñ', 'v', 'r', 'w', 's', 'i'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel3/leccion1/tl/chipotle.png'),
                    word: [null, null, 'i', 'p', 'o', null, null, 'e'],
                    correctLetters: ['c', 'h', 't','l'],
                    options: ['h', 'c', 't', 't', 'r', 'f', 'd', 'l'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                }
            ]}
            onFinish={() => console.log('Juego terminado')}
            firstSlideBackRoute="/(tabs)/niveles/nivel2/leccion2/especialesU" // revisar
            lastSlideNextRoute="/(tabs)\Level3Screen"
            advanceEndpoint="/progreso/avanzar-leccion-12"
            onTopBack={() => router.push('/(tabs)/Level3Screen')}
        />
    );
}
