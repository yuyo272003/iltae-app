import React from 'react';
import { router } from 'expo-router';
import SyllableScreen from '../../../../../components/SilabasMicrofono';

export default function LeccionManzana() {
    return (
        <SyllableScreen
            syllables={[
                { text: 'Ma', audio: require('@assets/audio/levels/nivel4/ma.wav') },
                { text: 'ri', audio: require('@assets/audio/levels/nivel4/ri.wav') },
                { text: 'po', audio: require('@assets/audio/levels/nivel4/po.wav') },
                { text: 'sa', audio: require('@assets/audio/levels/nivel4/sa.wav') },
            ]}
            targetWord="Mariposa"
            practiceAudio={require('@assets/audio/levels/nivel4/instruction.wav')}
            // audios de retroalimentación
            successAudio={require('@assets/audio/Todos.wav')}
            failureAudio={require('@assets/audio/Todos.wav')}
            imageSource={require('@assets/images/lecciones/nivel2/mariposa.png')}
            onTopBack={() => router.push('/(tabs)/Level4Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles/nivel4/leccion4/Gelatina')}
            
            onNext={() => router.push('/(tabs)/niveles/nivel4/leccion4/Palomitas')}
        />
    );
}
