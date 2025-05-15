import React from 'react';
import { router } from 'expo-router';
import SyllableScreen from '../../../../../components/SilabasMicrofono';

export default function LeccionManzana() {
    return (
        <SyllableScreen
            syllables={[
                { text: 'He', audio: require('@assets/audio/levels/nivel4/he.wav') },
                { text: 'la', audio: require('@assets/audio/levels/nivel4/la.wav') },
                { text: 'do', audio: require('@assets/audio/levels/nivel4/do.wav') },
            ]}
            targetWord="Helado"
            practiceAudio={require('@assets/audio/levels/nivel4/instruction.wav')}
            // audios de retroalimentación
            successAudio={require('@assets/audio/levels/nivel4/correctopalabra.wav')}
            failureAudio={require('@assets/audio/levels/nivel4/fallopalabra.wav')}
            imageSource={require('@assets/images/lecciones/nivel2/helado.png')}
            onTopBack={() => router.push('/(tabs)/Level4Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel4/leccion3/firstScreen')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel4/leccion3/Montana')}
        />
    );
}
