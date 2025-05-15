import React from 'react';
import { router } from 'expo-router';
import SyllableScreen from '../../../../../components/SilabasMicrofono';

export default function LeccionManzana() {
    return (
        <SyllableScreen
            syllables={[
                { text: 'Pa', audio: require('@assets/audio/levels/nivel4/pa.wav') },
                { text: 'le', audio: require('@assets/audio/levels/nivel4/le.wav') },
                { text: 'ta', audio: require('@assets/audio/levels/nivel4/ta.wav') },
            ]}
            targetWord="Paleta"
            practiceAudio={require('@assets/audio/levels/nivel4/instruction.wav')}
            // audios de retroalimentación
            successAudio={require('@assets/audio/levels/nivel4/correctopalabra.wav')}
            failureAudio={require('@assets/audio/levels/nivel4/fallopalabra.wav')}
            imageSource={require('@assets/images/lecciones/nivel2/paleta.png')}
            onTopBack={() => router.push('/(tabs)/Level4Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel4/leccion3/Montana')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel4/leccion3/Tomate')}
        />
    );
}
