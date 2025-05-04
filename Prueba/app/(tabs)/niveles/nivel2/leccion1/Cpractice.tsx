import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import PracticeImageAudioScreen from '../../../../../components/PracticeWordScreen';
import { useScreenProgress } from '../../../../../hooks/useScreenProgress';

export default function ScreenWord() {
  const leccionId: string = 'leccion1';
  const isReady = useScreenProgress(leccionId);
  
  if (!isReady) return null;
    
  const images = [
    { id: '1', src: require('@/assets/images/lecciones/nivel2/pantalon.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/pantalon.wav'), isCorrect: false },
    { id: '2', src: require('@/assets/images/lecciones/nivel2/cereza.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/cereza.wav'), isCorrect: true },
    { id: '3', src: require('@/assets/images/lecciones/nivel2/diente.png'),audio: require('@/assets/audio/levels/nivel2/audios_lesson1/diente.wav'), isCorrect: false },
    { id: '4', src: require('@/assets/images/lecciones/nivel2/cafe.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/cafe.wav'),isCorrect: true },
    { id: '5', src: require('@/assets/images/lecciones/nivel2/balon.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/balon.wav'),isCorrect: false },
    { id: '6', src: require('@/assets/images/lecciones/nivel2/conejo.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/conejo.wav'),isCorrect: true },
  ];

  return (
    <PracticeImageAudioScreen
        title="Cc"
        titleAudio={require('@assets/audio/levels/nivel1/lessons/C/C.wav')}
        practiceAudio={require('@/assets/audio/levels/nivel2/audios_lesson1/practice.wav')}
        images={images}
        onTopBack={() => router.push('/(tabs)/Level2Screen')}
        // @ts-ignore
        onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion1/Bpractice')}
        // @ts-ignore
        onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/Dpractice')}
      
    />
  );
}
