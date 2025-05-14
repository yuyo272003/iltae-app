import React from 'react';
import { router } from 'expo-router';
import SyllableScreen from '../../../../../components/SilabasMicrofono';

export default function LeccionManzana() {
    return (
        <SyllableScreen
            syllables={[
                { text: 'Bi', audio: require('@assets/audio/levels/nivel4/bi.wav') },
                { text: 'ci', audio: require('@assets/audio/levels/nivel4/ci.wav') },
                { text: 'cle', audio: require('@assets/audio/levels/nivel4/cle.wav') },
                { text: 'ta', audio: require('@assets/audio/levels/nivel4/ta.wav') },
            ]}
            targetWord="Bicicleta"
            practiceAudio={require('@assets/audio/levels/nivel4/instruction.wav')}
            // audios de retroalimentación
            successAudio={require('@assets/audio/Todos.wav')}
            failureAudio={require('@assets/audio/Todos.wav')}
            imageSource={require('@assets/images/lecciones/nivel2/bicicleta.png')}
            onTopBack={() => router.push('/(tabs)/Level4Screen')}
            // @ts-ignore
            onNext={() => router.push('(tabs)/niveles/nivel4/leccion4/Gelatina')}
        />
    );
}
