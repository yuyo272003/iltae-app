import React from 'react';
import { router } from 'expo-router';
import SyllableScreen from '../../../../../components/SilabasMicrofono';

export default function LeccionManzana() {
    return (
        <SyllableScreen
            syllables={[
                { text: 'Sol', audio: require('@assets/audio/levels/nivel2/audios_lesson1/sol.wav') }
            ]}
            targetWord="Sol"
            practiceAudio={require('@assets/audio/Todos.wav')}
            // audios de retroalimentación
            successAudio={require('@assets/audio/Todos.wav')}
            failureAudio={require('@assets/audio/Todos.wav')}
            imageSource={require('@assets/images/lecciones/nivel2/sol.png')}
            onTopBack={() => router.push('/(tabs)/Level4Screen')}
            // @ts-ignore
            onNext={() => router.push('(tabs)/niveles/nivel4/leccion1/Flor')}
        />
    );
}
