import React from 'react';
import {router} from "expo-router";
import PracticeImageAudioScreen from '../../../../../components/PracticeWordScreen';

export default function ScreenWord() {
  const images = [
    { id: '1', src: require('@/assets/images/lecciones/nivel2/piña.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/piña.wav'), isCorrect: false },
    { id: '2', src: require('@/assets/images/lecciones/nivel2/nariz.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/nariz.wav'), isCorrect: true },
    { id: '3', src: require('@/assets/images/lecciones/nivel2/montaña.png'),audio: require('@/assets/audio/levels/nivel2/audios_lesson1/montaña.wav'), isCorrect: false },
    { id: '4', src: require('@/assets/images/lecciones/nivel2/naranja.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/naranja.wav'),isCorrect: true },
    { id: '5', src: require('@/assets/images/lecciones/nivel2/uña.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/uña.wav'),isCorrect: true },
    { id: '6', src: require('@/assets/images/lecciones/nivel2/muñeca.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/muñeca.wav'),isCorrect: true},
  ];

  return (
    <PracticeImageAudioScreen
        title="Ññ"
        titleAudio={require('@assets/audio/levels/nivel1/lessons/G/G.wav')}
        practiceAudio={require('@/assets/audio/levels/nivel2/audios_lesson1/practice.wav')} 
        images={images}
        onTopBack={() => router.push('/(tabs)/Level2Screen')}
        // @ts-ignore
        onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion1/Npractice')}
        // @ts-ignore
        onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/Ppractice')}
      
    />
  );
}
