import React from 'react';
import { router } from 'expo-router';
import SyllableScreen from '../../../../../components/SilabasMicrofono';

export default function LeccionManzana() {
    return (
        <SyllableScreen
            syllables={[
                { text: 'Mu', audio: require('@assets/audio/levels/nivel4/mu.wav') },
                { text: 'ñe', audio: require('@assets/audio/levels/nivel4/ñe.wav') },
                { text: 'ca', audio: require('@assets/audio/levels/nivel4/ca.wav') },
            ]}
            targetWord="Muñeca"
            practiceAudio={require('@assets/audio/levels/nivel4/instruction.wav')}
            // audios de retroalimentación
            successAudio={require('@assets/audio/levels/nivel4/correctopalabra.wav')}
            failureAudio={require('@assets/audio/levels/nivel4/fallopalabra.wav')}
            imageSource={require('@assets/images/lecciones/nivel2/muñeca.png')}
            onTopBack={() => router.push('/(tabs)/Level4Screen')}
            onBottomBack={() => router.push('/(tabs)/Level4Screen')} 
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel4/leccion3/Helado')}
        />
    );
}
