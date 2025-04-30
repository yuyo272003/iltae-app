import React from 'react';
import {router} from "expo-router";
import PracticeImageAudioScreen from '../../../../../components/PracticeWordScreen';

export default function PantallaLetra() {
  const images = [
    { id: '1', src: require('@/assets/images/lecciones/nivel2/mariposa.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/mariposa.wav'), isCorrect: true },
    { id: '2', src: require('@/assets/images/lecciones/nivel2/foco.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/foco.wav'), isCorrect: false },
    { id: '3', src: require('@/assets/images/lecciones/nivel2/piña.png'),audio: require('@/assets/audio/levels/nivel2/audios_lesson1/piña.wav'), isCorrect: true },
    { id: '4', src: require('@/assets/images/lecciones/nivel2/pelota.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/pelota.wav'),isCorrect: true },
    { id: '5', src: require('@/assets/images/lecciones/nivel2/hongo.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/hongo.wav'),isCorrect: false },
    { id: '6', src: require('@/assets/images/lecciones/nivel2/paleta.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/paleta.wav'),isCorrect: true},
  ];

  return (
    <PracticeImageAudioScreen
        title="Pp"
        titleAudio={require('@assets/audio/levels/nivel1/lessons/G/G.wav')}
        practiceAudio={require('@/assets/audio/levels/nivel2/audios_lesson1/practice.wav')} 
        images={images}
        onTopBack={() => router.push('/(tabs)/Level2Screen')}
        // @ts-ignore
        onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion1/N2practice')}
        // @ts-ignore
        onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/Qpractice')}
      
    />
  );
}
