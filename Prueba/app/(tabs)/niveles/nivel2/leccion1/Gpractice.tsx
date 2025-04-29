import React from 'react';
import {router} from "expo-router";
import PracticeImageAudioScreen from '../../../../../components/PracticeWordScreen';

export default function PantallaLetra() {
  const images = [
    { id: '1', src: require('@/assets/images/lecciones/nivel2/conejo.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/conejo.wav'), isCorrect: false },
    { id: '2', src: require('@/assets/images/lecciones/nivel2/gato.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/gato.wav'), isCorrect: true },
    { id: '3', src: require('@/assets/images/lecciones/nivel2/billete.png'),audio: require('@/assets/audio/levels/nivel2/audios_lesson1/billete.wav'), isCorrect: false },
    { id: '4', src: require('@/assets/images/lecciones/nivel2/gelatina.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/gelatina.wav'),isCorrect: true },
    { id: '5', src: require('@/assets/images/lecciones/nivel2/guante.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/guante.wav'),isCorrect: true },
    { id: '6', src: require('@/assets/images/lecciones/nivel2/gorra.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/gorra.wav'),isCorrect: true},
  ];

  return (
    <PracticeImageAudioScreen
        title="Gg"
        titleAudio={require('@assets/audio/levels/nivel1/lessons/G/G.wav')}
        practiceAudio={require('@/assets/audio/levels/nivel2/audios_lesson1/practice.wav')} 
        images={images}
        onTopBack={() => router.push('/(tabs)/Level2Screen')}
        // @ts-ignore
        onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion1/Fpractice')}
        // @ts-ignore
        onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/Hpractice')}
      
    />
  );
}
