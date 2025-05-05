import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePathname, router } from 'expo-router';
import PracticeImageAudioScreen from '../../../../../components/PracticeWordScreen';
// import { useScreenProgress } from '../../../../../hooks/useScreenProgress';
// import { getLeccionIdFromPath } from '../../../../../utils/pathHelpers';


export default function PantallaLetra() {

  const images = [
    { id: '1', src: require('@/assets/images/lecciones/nivel2/billete.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/billete.wav'), isCorrect: true },
    { id: '2', src: require('@/assets/images/lecciones/nivel2/barco.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/barco.wav'), isCorrect: true },
    { id: '3', src: require('@/assets/images/lecciones/nivel2/paleta.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/paleta.wav'), isCorrect: false },
    { id: '4', src: require('@/assets/images/lecciones/nivel2/bicicleta.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/bicicleta.wav'), isCorrect: true },
    { id: '5', src: require('@/assets/images/lecciones/nivel2/balon.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/balon.wav'), isCorrect: true },
    { id: '6', src: require('@/assets/images/lecciones/nivel2/medusa.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/medusa.wav'), isCorrect: false },
  ];

  return (
    <PracticeImageAudioScreen
      title="Bb"
      titleAudio={require('@assets/audio/levels/nivel1/lessons/B/B.wav')}
      practiceAudio={require('@/assets/audio/levels/nivel2/audios_lesson1/practice.wav')}
      images={images}
      onTopBack={() => router.push('/(tabs)/Level2Screen')}
      onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/Cpractice')}
    />
  );
}
