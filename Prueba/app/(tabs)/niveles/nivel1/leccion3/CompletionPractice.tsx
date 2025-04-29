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
                    image: require('@assets/images/lecciones/nivel1/lessons/dedo.png'),
                    word: [null, 'e', null, 'o'],
                    correctLetters: ['d', 'd'],
                    options: ['b', 't', 'p','d','g','k','v'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel1/lessons/boda.png'),
                    word: [null, 'o', null, 'a'],
                    correctLetters: ['b', 'd'],
                    options: ['b', 't', 'p','d','g','k','v'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel1/lessons/agua3.png'),
                    word: ['a', null, 'u', 'a'],
                    correctLetters: ['g'],
                    options: ['b', 't', 'p','d','g','k','v'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel1/lessons/puerta.png'),
                    word: [null, 'u', 'e', 'r',null,'a'],
                    correctLetters: ['p','t'],
                    options: ['b', 't', 'p','d','g','t','v'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
            ]}
            onFinish={() => console.log('Juego terminado')}
            firstSlideBackRoute="/(tabs)/niveles/nivel1/leccion3/Tt/Tpalabra"
            lastSlideNextRoute="/(tabs)/Level1Screen"
            advanceEndpoint="/progreso/avanzar-leccion-3"
            onTopBack={handleTopBack}
        />
    );
}