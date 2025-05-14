import React from 'react';
import { router } from 'expo-router';
import SyllableScreen from '../../../../../components/SilabasMicrofono';

export default function LeccionManzana() {
    return (
        <SyllableScreen
            syllables={[
                { text: 'Za', audio: require('@assets/audio/levels/nivel4/ge.wav') },
                { text: 'na', audio: require('@assets/audio/levels/nivel4/ge.wav') },
                { text: 'ho', audio: require('@assets/audio/levels/nivel4/ge.wav') },
                { text: 'ria', audio: require('@assets/audio/levels/nivel4/ge.wav') },
            ]}
            targetWord="Gelatina"
            practiceAudio={require('@assets/audio/levels/nivel4/instruction.wav')}
            // audios de retroalimentación
            successAudio={require('@assets/audio/Todos.wav')}
            failureAudio={require('@assets/audio/Todos.wav')}
            imageSource={require('@assets/images/lecciones/nivel2/zanahoria.png')}
            onTopBack={() => router.push('/(tabs)/Level4Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles/nivel4/leccion4/Palomitas')}
            
            onNext={() => router.push('/(tabs)/Level4Screen')}
        />
    );
}
