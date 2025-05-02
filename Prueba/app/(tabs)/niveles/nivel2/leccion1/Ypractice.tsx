import React from 'react';
import {router} from "expo-router";
import PracticeImageAudioScreen from '../../../../../components/PracticeWordScreen';

export default function PantallaLetra() {
  const images = [
    { id: '1', src: require('@/assets/images/lecciones/nivel2/yogurt.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/yogurt.wav'), isCorrect: true },
    { id: '2', src: require('@/assets/images/lecciones/nivel2/limon.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/limon.wav'), isCorrect: false },
    { id: '3', src: require('@/assets/images/lecciones/nivel2/yoyo.png'),audio: require('@/assets/audio/levels/nivel2/audios_lesson1/yoyo.wav'), isCorrect: true },
    { id: '4', src: require('@/assets/images/lecciones/nivel2/sandia.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/sandia.wav'),isCorrect: false },
    { id: '5', src: require('@/assets/images/lecciones/nivel2/lupa.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/lupa.wav'),isCorrect: false },
    { id: '6', src: require('@/assets/images/lecciones/nivel2/yema.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/yema.wav'),isCorrect: true},
  ];

  return (
    <PracticeImageAudioScreen
        title="Yy"
        titleAudio={require('@assets/audio/levels/nivel1/lessons/G/G.wav')}
        practiceAudio={require('@/assets/audio/levels/nivel2/audios_lesson1/practice.wav')} 
        images={images}
        onTopBack={() => router.push('/(tabs)/Level2Screen')}
        // @ts-ignore
        onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion1/Xpractice')}
        // @ts-ignore
        onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/Zpractice')}
      
    />
  );
}
