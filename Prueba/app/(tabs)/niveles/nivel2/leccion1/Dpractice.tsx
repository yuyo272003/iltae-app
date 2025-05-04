import React,{useEffect} from 'react';
import {router, usePathname} from "expo-router";
import PracticeImageAudioScreen from '../../../../../components/PracticeWordScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useScreenProgress } from '../../../../../hooks/useScreenProgress';

export default function ScreenWord() {
  const leccionId: string = 'leccion1';
  const isReady = useScreenProgress(leccionId);
  
  if (!isReady) return null;
  const images = [
    { id: '1', src: require('@/assets/images/lecciones/nivel2/pastel.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/pastel.wav'), isCorrect: false },
    { id: '2', src: require('@/assets/images/lecciones/nivel2/balon.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/balon.wav'), isCorrect: true },
    { id: '3', src: require('@/assets/images/lecciones/nivel1/lessons/dado.png'),audio: require('@/assets/audio/levels/nivel1/lessons/D/dado.wav'), isCorrect: false },
    { id: '4', src: require('@/assets/images/lecciones/nivel1/lessons/dedo.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/dedo.wav'),isCorrect: true },
    { id: '5', src: require('@/assets/images/lecciones/nivel2/miel.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/miel.wav'),isCorrect: false },
    { id: '6', src: require('@/assets/images/lecciones/nivel2/diente.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/diente.wav'),isCorrect: true },
  ];
  return (
    <PracticeImageAudioScreen
        title="Dd"
        titleAudio={require('@assets/audio/levels/nivel1/lessons/D/D.wav')}
        practiceAudio={require('@/assets/audio/levels/nivel2/audios_lesson1/practice.wav')}
        images={images}
        //onCorrect={() => console.log('¡Correcto!')}
        //onIncorrect={() => console.log('Intenta de nuevo')}
        onTopBack={async () => {
          await AsyncStorage.removeItem('progresoLeccion');
          router.push('/(tabs)/Level2Screen');
        }}
        // @ts-ignore
        onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion1/Cpractice')}
        // @ts-ignore
        onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/Fpractice')}
      
    />
  );
}
