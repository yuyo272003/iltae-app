import React from 'react';
import { router } from 'expo-router';
import SyllableScreen from '../../../../../components/SilabasMicrofono';

export default function LeccionManzana() {
    return (
        <SyllableScreen
            syllables={[
                { text: 'Mon', audio: require('@assets/audio/levels/nivel4/mon.wav') },
                { text: 'ta', audio: require('@assets/audio/levels/nivel4/ta.wav') },
                { text: 'ña', audio: require('@assets/audio/levels/nivel4/ña.wav') },
            ]}
            targetWord="Montaña"
            practiceAudio={require('@assets/audio/levels/nivel4/instruction.wav')}
            // audios de retroalimentación
            successAudio={require('@assets/audio/Todos.wav')}
            failureAudio={require('@assets/audio/Todos.wav')}
            imageSource={require('@assets/images/lecciones/nivel2/montaña.png')}
            onTopBack={() => router.push('/(tabs)/Level4Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel4/leccion3/Helado')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel4/leccion3/Paleta')}
        />
    );
}
