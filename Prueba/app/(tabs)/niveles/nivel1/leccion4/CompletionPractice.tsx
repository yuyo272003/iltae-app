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
                    image: require('@assets/images/lecciones/nivel1/lessons/fiesta.png'),
                    word: [null, 'i', 'e','s','t', 'a'],
                    correctLetters: ['f'],
                    options: ['f','j','s','x','z'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel1/lessons/serpiente.png'),
                    word: [null, 'e','r','p','i','e','n','t','e'],
                    correctLetters: ['s'],
                    options: ['f','j','s','x','z'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },
                {
                    image: require('@assets/images/lecciones/nivel1/lessons/jitomate.png'),
                    word: [null, 'i','t','o','m','a','t','e'],
                    correctLetters: ['j'],
                    options: ['f','j','s','x','z'],
                    audio: require('@assets/audio/levels/nivel1/lessons/Ñ/actividadpalabrasleccion2.wav')
                },

            ]}
            onFinish={() => console.log('Juego terminado')}
            firstSlideBackRoute="/(tabs)/niveles/nivel1/leccion4/Zpalabra"
            lastSlideNextRoute="/(tabs)/Level1Screen"
            onTopBack={handleTopBack}
        />
    );
}