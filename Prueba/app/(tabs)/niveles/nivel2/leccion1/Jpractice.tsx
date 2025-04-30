import React from 'react';
import {router} from "expo-router";
import PracticeImageAudioScreen from '../../../../../components/PracticeWordScreen';

export default function PantallaLetra() {
  const images = [
    { id: '1', src: require('@/assets/images/lecciones/nivel2/jirafa.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/jirafa.wav'), isCorrect: true },
    { id: '2', src: require('@/assets/images/lecciones/nivel2/fogata.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/fogata.wav'), isCorrect: false },
    { id: '3', src: require('@/assets/images/lecciones/nivel2/leche.png'),audio: require('@/assets/audio/levels/nivel2/audios_lesson1/leche.wav'), isCorrect: false },
    { id: '4', src: require('@/assets/images/lecciones/nivel2/jugo.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/jugo.wav'),isCorrect: true },
    { id: '5', src: require('@/assets/images/lecciones/nivel2/jarra.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/jarra.wav'),isCorrect: true },
    { id: '6', src: require('@/assets/images/lecciones/nivel2/hongo.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/hongo.wav'),isCorrect: false},
  ];

  return (
    <PracticeImageAudioScreen
        title="Jj"
        titleAudio={require('@assets/audio/levels/nivel1/lessons/G/G.wav')}
        practiceAudio={require('@/assets/audio/levels/nivel2/audios_lesson1/practice.wav')} 
        images={images}
        onTopBack={() => router.push('/(tabs)/Level2Screen')}
        // @ts-ignore
        onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion1/Hpractice')}
        // @ts-ignore
        onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/Kpractice')}
      
    />
  );
}
