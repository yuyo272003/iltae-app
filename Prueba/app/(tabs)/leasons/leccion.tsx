import React from 'react';
import LetterScreen from '../../../components/LetterScreen';

export default function Leccion2() {
    return (
        <LetterScreen
            letter="Aa"
            letterAudio={require('@assets/audio/lecciones/nivel1/lessons/A/A2.wav')}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/A/a.wav')}
        />
    );
}