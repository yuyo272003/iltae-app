import PracticeImageAudioScreen from '../../../../../components/PracticeWordScreen';
import React, {useEffect} from 'react';
import {router} from "expo-router";

export default function ScreenWord() {
  const images = [
    { id: '1', src: require('@/assets/images/lecciones/nivel2/violin.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/violin.wav'), isCorrect: true },
    { id: '2', src: require('@/assets/images/lecciones/nivel2/vampiro.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/vampiro.wav'), isCorrect: true },
    { id: '3', src: require('@/assets/images/lecciones/nivel2/barco.png'),audio: require('@/assets/audio/levels/nivel2/audios_lesson1/barco.wav'), isCorrect: false },
    { id: '4', src: require('@/assets/images/lecciones/nivel2/volcan.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/volcan.wav'),isCorrect: true },
    { id: '5', src: require('@/assets/images/lecciones/nivel2/muñeca.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/muñeca.wav'),isCorrect: false },
    { id: '6', src: require('@/assets/images/lecciones/nivel2/paleta.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/paleta.wav'),isCorrect: false},
  ];
  return (
    <PracticeImageAudioScreen
        title="Vv"
        titleAudio={require('@assets/audio/levels/nivel1/lessons/G/G.wav')}
        practiceAudio={require('@/assets/audio/levels/nivel2/audios_lesson1/practice.wav')} 
        images={images}
        onTopBack={() => router.push('/(tabs)/Level2Screen')}
        // @ts-ignore
        onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion1/Tpractice')}
        // @ts-ignore
        onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/Wpractice')}
      
    />
  );
}
