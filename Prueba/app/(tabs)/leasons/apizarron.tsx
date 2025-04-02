import React from 'react';
import LetterScreenWithCanvas from '../../../components/LetterScreenWithCanvas';

export default function Leccion1() {
    return (
        <LetterScreenWithCanvas
            letter="Aa"
            letterAudio={require('@assets/audio/lecciones/nivel1/intro.wav')}
            practiceAudio={require('@assets/audio/lecciones/nivel1/intro.wav')}
        />
    );
}
