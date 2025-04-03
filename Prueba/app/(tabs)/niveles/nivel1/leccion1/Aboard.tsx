import React from 'react';
import LetterScreenWithDrawing from '../../../../../components/LetterScreenWithDrawing';

export default function Leccion1() {
    return (
        <LetterScreenWithDrawing
            imageSource={require('@assets/images/lecciones/nivel1/lessons/letterA.png')}  // Aquí importas la imagen
            letterAudio={require('@assets/audio/lecciones/nivel1/intro.wav')}
            practiceAudio={require('@assets/audio/lecciones/nivel1/intro.wav')}
        />
    );
}

