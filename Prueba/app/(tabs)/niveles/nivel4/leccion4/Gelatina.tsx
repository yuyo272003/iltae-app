import React from 'react';
import { router } from 'expo-router';
import SyllableScreen from '../../../../../components/SilabasMicrofono';

export default function LeccionManzana() {
    return (
        <SyllableScreen
            syllables={[
                { text: 'Ge', audio: require('@assets/audio/levels/nivel4/ge.wav') },
                { text: 'la', audio: require('@assets/audio/levels/nivel4/la.wav') },
                { text: 'ti', audio: require('@assets/audio/levels/nivel4/ti.wav') },
                { text: 'na', audio: require('@assets/audio/levels/nivel4/na.wav') },
            ]}
            targetWord="Gelatina"
            practiceAudio={require('@assets/audio/levels/nivel4/instruction.wav')}
            // audios de retroalimentación
            successAudio={require('@assets/audio/Todos.wav')}
            failureAudio={require('@assets/audio/Todos.wav')}
            imageSource={require('@assets/images/lecciones/nivel2/gelatina.png')}
            onTopBack={() => router.push('/(tabs)/Level4Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles/nivel4/leccion4/firstScreen')}
            
            onNext={() => router.push('/(tabs)/niveles/nivel4/leccion4/Mariposa')}
        />
    );
}
