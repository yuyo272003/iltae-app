import React from 'react';
import { router } from 'expo-router';
import SyllableScreen from '../../../../../components/SilabasMicrofono';

export default function LeccionManzana() {
    return (
        <SyllableScreen
            syllables={[
                { text: 'Hon', audio: require('@assets/audio/levels/nivel4/hon.wav') },
                { text: 'go', audio: require('@assets/audio/levels/nivel4/go.wav') },
            ]}
            targetWord="Hada"
            practiceAudio={require('@assets/audio/levels/nivel4/instruction.wav')}
            // audios de retroalimentación
            successAudio={require('@assets/audio/Todos.wav')}
            failureAudio={require('@assets/audio/Todos.wav')}
            imageSource={require('@assets/images/lecciones/nivel2/hongo.png')}
            onTopBack={() => router.push('/(tabs)/Level4Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel4/leccion2/Gorra')}
            // @ts-ignore
            onNext={() => router.push('(tabs)/niveles/nivel4/leccion2/Radio')}
        />
    );
}
