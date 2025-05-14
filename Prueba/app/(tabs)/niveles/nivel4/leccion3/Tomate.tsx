import React from 'react';
import { router } from 'expo-router';
import SyllableScreen from '../../../../../components/SilabasMicrofono';

export default function LeccionManzana() {
    return (
        <SyllableScreen
            syllables={[
                { text: 'To', audio: require('@assets/audio/levels/nivel4/to.wav') },
                { text: 'ma', audio: require('@assets/audio/levels/nivel4/ma.wav') },
                { text: 'te', audio: require('@assets/audio/levels/nivel4/te.wav') },
            ]}
            targetWord="Tomate"
            practiceAudio={require('@assets/audio/levels/nivel4/instruction.wav')}
            // audios de retroalimentación
            successAudio={require('@assets/audio/Todos.wav')}
            failureAudio={require('@assets/audio/Todos.wav')}
            imageSource={require('@assets/images/lecciones/nivel2/tomate.png')}
            onTopBack={() => router.push('/(tabs)/Level4Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel4/leccion3/Paleta')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/Level4Screen')}
        />
    );
}
