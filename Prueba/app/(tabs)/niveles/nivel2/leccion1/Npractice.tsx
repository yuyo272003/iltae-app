import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {router, usePathname} from "expo-router";
import PracticeImageAudioScreen from '../../../../../components/PracticeWordScreen';

export default function ScreenWord() {
  const images = [
    { id: '1', src: require('@/assets/images/lecciones/nivel2/naranja.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/naranja.wav'), isCorrect: true },
    { id: '2', src: require('@/assets/images/lecciones/nivel2/hueso.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/hueso.wav'), isCorrect: false },
    { id: '3', src: require('@/assets/images/lecciones/nivel2/noche.png'),audio: require('@/assets/audio/levels/nivel2/audios_lesson1/noche.wav'), isCorrect: true },
    { id: '4', src: require('@/assets/images/lecciones/nivel2/fideos.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/fideos.wav'),isCorrect: false },
    { id: '5', src: require('@/assets/images/lecciones/nivel2/diente.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/diente.wav'),isCorrect: true },
    { id: '6', src: require('@/assets/images/lecciones/nivel2/nariz.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/nariz.wav'),isCorrect: true},
  ];

  const pathname = usePathname();
  useEffect(() => {
    const guardarRuta = async () => {
      await AsyncStorage.setItem('progresoLeccion', pathname);
    };
    guardarRuta();
  }, [pathname]);
  
  return (
    <PracticeImageAudioScreen
        title="Nn"
        titleAudio={require('@assets/audio/levels/nivel1/lessons/G/G.wav')}
        practiceAudio={require('@/assets/audio/levels/nivel2/audios_lesson1/practice.wav')} 
        images={images}
        onTopBack={() => router.push('/(tabs)/Level2Screen')}
        // @ts-ignore
        onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion1/Mpractice')}
        // @ts-ignore
        onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/N2practice')}
      
    />
  );
}
