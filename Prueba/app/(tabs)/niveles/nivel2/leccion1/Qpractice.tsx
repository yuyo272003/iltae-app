import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {router, usePathname} from "expo-router";
import PracticeImageAudioScreen from '../../../../../components/PracticeWordScreen';

export default function PantallaLetra() {
  const images = [
    { id: '1', src: require('@/assets/images/lecciones/nivel2/queso.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/queso.wav'), isCorrect: true },
    { id: '2', src: require('@/assets/images/lecciones/nivel2/koala.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/koala.wav'), isCorrect: false },
    { id: '3', src: require('@/assets/images/lecciones/nivel2/conejo.png'),audio: require('@/assets/audio/levels/nivel2/audios_lesson1/conejo.wav'), isCorrect: false },
    { id: '4', src: require('@/assets/images/lecciones/nivel2/quimica.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/quimica.wav'),isCorrect: true },
    { id: '5', src: require('@/assets/images/lecciones/nivel2/quemado.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/quemado.wav'),isCorrect: true },
    { id: '6', src: require('@/assets/images/lecciones/nivel2/cafe.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/cafe.wav'),isCorrect: false},
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
        title="Qq"
        titleAudio={require('@assets/audio/levels/nivel1/lessons/G/G.wav')}
        practiceAudio={require('@/assets/audio/levels/nivel2/audios_lesson1/practice.wav')} 
        images={images}
        onTopBack={() => router.push('/(tabs)/Level2Screen')}
        // @ts-ignore
        onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion1/Ppractice')}
        // @ts-ignore
        onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/Rpractice')}
      
    />
  );
}
