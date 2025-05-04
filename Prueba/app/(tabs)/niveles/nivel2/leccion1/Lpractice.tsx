import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {router, usePathname} from "expo-router";
import PracticeImageAudioScreen from '../../../../../components/PracticeWordScreen';

export default function ScreenWord() {
  const images = [
    { id: '1', src: require('@/assets/images/lecciones/nivel2/pantalon.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/pantalon.wav'), isCorrect: true },
    { id: '2', src: require('@/assets/images/lecciones/nivel2/lapiz.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/lapiz.wav'), isCorrect: true },
    { id: '3', src: require('@/assets/images/lecciones/nivel2/gelatina.png'),audio: require('@/assets/audio/levels/nivel2/audios_lesson1/gelatina.wav'), isCorrect: true },
    { id: '4', src: require('@/assets/images/lecciones/nivel2/lupa.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/lupa.wav'),isCorrect: true },
    { id: '5', src: require('@/assets/images/lecciones/nivel2/medusa.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/medusa.wav'),isCorrect: false },
    { id: '6', src: require('@/assets/images/lecciones/nivel2/limon.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/limon.wav'),isCorrect: true},
  ];

  return (
    <PracticeImageAudioScreen
        title="Ll"
        titleAudio={require('@assets/audio/levels/nivel1/lessons/G/G.wav')}
        practiceAudio={require('@/assets/audio/levels/nivel2/audios_lesson1/practice.wav')} 
        images={images}
        onTopBack={() => router.push('/(tabs)/Level2Screen')}
        // @ts-ignore
        onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion1/Kpractice')}
        // @ts-ignore
        onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/Mpractice')}
      
    />
  );
}
