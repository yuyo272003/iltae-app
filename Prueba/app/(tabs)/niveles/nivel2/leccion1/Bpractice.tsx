import React from 'react';
import {router} from "expo-router";
import PracticeImageAudioScreen from '../../../../../components/PracticeWordScreen';

export default function PantallaLetra() {
  const images = [
    { id: '1', src: require('@/assets/images/lecciones/nivel2/billete.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/billete.wav'), isCorrect: true },
    { id: '2', src: require('@/assets/images/lecciones/nivel2/barco.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/barco.wav'), isCorrect: true },
    { id: '3', src: require('@/assets/images/lecciones/nivel2/paleta.png'),audio: require('@/assets/audio/levels/nivel2/audios_lesson1/paleta.wav'), isCorrect: false },
    { id: '4', src: require('@/assets/images/lecciones/nivel2/bicicleta.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/bicicleta.wav'),isCorrect: true },
    { id: '5', src: require('@/assets/images/lecciones/nivel2/balon.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/balon.wav'),isCorrect: false },
    { id: '6', src: require('@/assets/images/lecciones/nivel2/medusa.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/medusa.wav'),isCorrect: true },
  ];

  return (
    <PracticeImageAudioScreen
        title="Bb"
        titleAudio={require('@assets/audio/levels/nivel1/lessons/B/B.wav')}
        practiceAudio={require('@/assets/audio/levels/nivel2/audios_lesson1/practice.wav')}
        images={images}
        //onCorrect={() => console.log('¡Correcto!')}
        //onIncorrect={() => console.log('Intenta de nuevo')}
        onTopBack={() => router.push('/(tabs)/Level2Screen')}
        // @ts-ignore
        onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/Cpractice')}
      
    />
  );
}