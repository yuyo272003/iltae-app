import React from 'react';
import { router } from 'expo-router';
import SyllableScreen from '../../../../../components/SilabasMicrofono';

export default function LeccionManzana() {
    return (
        <SyllableScreen
            syllables={[
                { text: 'Ra', audio: require('@assets/audio/levels/nivel4/rra.wav') },
                { text: 'dio', audio: require('@assets/audio/levels/nivel4/dio.wav') },
            ]}
            targetWord="Hada"
            practiceAudio={require('@assets/audio/levels/nivel4/instruction.wav')}
            // audios de retroalimentación
            successAudio={require('@assets/audio/levels/nivel4/correctopalabra.wav')}
            failureAudio={require('@assets/audio/levels/nivel4/fallopalabra.wav')}
            imageSource={require('@assets/images/lecciones/nivel2/radio.png')}
            onTopBack={() => router.push('/(tabs)/Level4Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel4/leccion2/Hongo')}
            // @ts-ignore
            onNext={() => router.push('(tabs)/niveles/nivel4/leccion2/Sandia')}
        />
    );
}
