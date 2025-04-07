import React from 'react';
import WordCompletionGame from '../../../../../components/WordCompletionGame';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <WordCompletionGame
            slides={[
                {
                    image: require('@assets/images/lecciones/nivel1/lessons/letterM.png'),
                    word: ['□', 'o', '□', 'o'],
                    correctLetter: 'm',
                    options: ['m', 'n', 'ñ'],
                },
                {
                    image: require('@assets/images/lecciones/nivel1/lessons/letterM.png'),
                    word: ['□', 'i', '□', 'o'],
                    correctLetter: 'n',
                    options: ['m', 'n', 'ñ'],
                },
                {
                    image: require('@assets/images/lecciones/nivel1/lessons/letterM.png'),
                    word: ['□', 'a', '□', 'a'],
                    correctLetter: 'm',
                    options: ['m', 'n', 'ñ'],
                },
            ]}
            onFinish={() => console.log("Juego terminado")}
        />
    );
}