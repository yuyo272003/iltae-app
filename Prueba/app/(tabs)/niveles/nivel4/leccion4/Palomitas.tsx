import React from 'react';
import { router } from 'expo-router';
import SyllableScreen from '../../../../../components/SilabasMicrofono';

export default function LeccionManzana() {
    return (
        <SyllableScreen
            syllables={[
                { text: 'Pa', audio: require('@assets/audio/levels/nivel4/ge.wav') },
                { text: 'lo', audio: require('@assets/audio/levels/nivel4/ge.wav') },
                { text: 'mi', audio: require('@assets/audio/levels/nivel4/ge.wav') },
                { text: 'tas', audio: require('@assets/audio/levels/nivel4/ge.wav') },
            ]}
            targetWord="Palomitas"
            practiceAudio={require('@assets/audio/levels/nivel4/instruction.wav')}
            // audios de retroalimentación
            successAudio={require('@assets/audio/Todos.wav')}
            failureAudio={require('@assets/audio/Todos.wav')}
            imageSource={require('@assets/images/lecciones/nivel2/palomitas.png')}
            onTopBack={() => router.push('/(tabs)/Level4Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles/nivel4/leccion4/Mariposa')}
            
            onNext={() => router.push('/(tabs)/niveles/nivel4/leccion4/Zanahoria')}
        />
    );
}
