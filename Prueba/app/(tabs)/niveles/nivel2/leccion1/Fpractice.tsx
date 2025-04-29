import React from 'react';
import {router} from "expo-router";
import PracticeImageAudioScreen from '../../../../../components/PracticeWordScreen';

export default function PantallaLetra() {
  const images = [
    { id: '1', src: require('@/assets/images/lecciones/nivel2/foco.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/foco.wav'), isCorrect: true },
    { id: '2', src: require('@/assets/images/lecciones/nivel2/balon.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/balon.wav'), isCorrect: false },
    { id: '3', src: require('@/assets/images/lecciones/nivel2/fogata.png'),audio: require('@/assets/audio/levels/nivel2/audios_lesson1/fogata.wav'), isCorrect: true },
    { id: '4', src: require('@/assets/images/lecciones/nivel2/fideos.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/fideos.wav'),isCorrect: true },
    { id: '5', src: require('@/assets/images/lecciones/nivel2/falda.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/falda.wav'),isCorrect: true },
    { id: '6', src: require('@/assets/images/lecciones/nivel1/lessons/dedo.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/dedo.wav'),isCorrect: false },
  ];

  return (
    <PracticeImageAudioScreen
        title="Ff"
        titleAudio={require('@assets/audio/levels/nivel1/lessons/F/F.wav')}
        practiceAudio={require('@/assets/audio/levels/nivel2/audios_lesson1/practice.wav')}
        images={images}
        //onCorrect={() => console.log('¡Correcto!')}
        //onIncorrect={() => console.log('Intenta de nuevo')}
        onTopBack={() => router.push('/(tabs)/Level2Screen')}
        // @ts-ignore
        onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion1/Dpractice')}
        // @ts-ignore
        onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/Gpractice')}
      
    />
  );
}
