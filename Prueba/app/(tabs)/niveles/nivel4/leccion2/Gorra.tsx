import React from 'react';
import { router } from 'expo-router';
import SyllableScreen from '../../../../../components/SilabasMicrofono';

export default function LeccionManzana() {
    return (
        <SyllableScreen
            syllables={[
                { text: 'Go', audio: require('@assets/audio/levels/nivel4/go.wav') },
                { text: 'rra', audio: require('@assets/audio/levels/nivel4/rra.wav') },
            ]}
            targetWord="Hada"
            practiceAudio={require('@assets/audio/levels/nivel4/instruction.wav')}
            // audios de retroalimentación
            successAudio={require('@assets/audio/levels/nivel4/correctopalabra.wav')}
            failureAudio={require('@assets/audio/levels/nivel4/fallopalabra.wav')}
            imageSource={require('@assets/images/lecciones/nivel2/gorra.png')}
            onTopBack={() => router.push('/(tabs)/Level4Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel4/leccion2/firstScreen')}
            // @ts-ignore
            onNext={() => router.push('(tabs)/niveles/nivel4/leccion2/Hongo')}
        />
    );
}
