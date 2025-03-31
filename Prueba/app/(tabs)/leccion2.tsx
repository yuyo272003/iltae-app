import React from 'react';
import LetterScreen from '../../components/LetterScreen';

export default function Leccion2() {
    return (
        <LetterScreen
            letter="Ee"
            letterAudio={require('../../assets/audio/lecciones/nivel1/intro.wav')}
            practiceAudio={require('../../assets/audio/lecciones/nivel1/intro.wav')}
        />
    );
}
