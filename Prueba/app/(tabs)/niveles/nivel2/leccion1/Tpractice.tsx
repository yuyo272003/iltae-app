import React, {useEffect} from 'react';
import {router} from "expo-router";
import PracticeImageAudioScreen from '../../../../../components/PracticeWordScreen';

export default function ScreenWord() {
  const images = [
    { id: '1', src: require('@/assets/images/lecciones/nivel2/taco.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/taco.wav'), isCorrect: true },
    { id: '2', src: require('@/assets/images/lecciones/nivel2/tomate.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/tomate.wav'), isCorrect: true },
    { id: '3', src: require('@/assets/images/lecciones/nivel2/dado.png'),audio: require('@/assets/audio/levels/nivel2/audios_lesson1/dado.wav'), isCorrect: false },
    { id: '4', src: require('@/assets/images/lecciones/nivel2/tiburon.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/tiburon.wav'),isCorrect: true },
    { id: '5', src: require('@/assets/images/lecciones/nivel2/paleta.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/paleta.wav'),isCorrect: true },
    { id: '6', src: require('@/assets/images/lecciones/nivel2/jugo.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/jugo.wav'),isCorrect: false},
  ];

  return (
    <PracticeImageAudioScreen
        title="Tt"
        titleAudio={require('@assets/audio/levels/nivel1/lessons/G/G.wav')}
        practiceAudio={require('@/assets/audio/levels/nivel2/audios_lesson1/practice.wav')} 
        images={images}
        onTopBack={() => router.push('/(tabs)/Level2Screen')}
        // @ts-ignore
        onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion1/Spractice')}
        // @ts-ignore
        onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/Vpractice')}
      
    />
  );
}
