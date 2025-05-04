import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {router, usePathname} from "expo-router";
import PracticeImageAudioScreen from '../../../../../components/PracticeWordScreen';

export default function PantallaLetra() {
  const images = [
    { id: '1', src: require('@/assets/images/lecciones/nivel2/robot.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/robot.wav'), isCorrect: true },
    { id: '2', src: require('@/assets/images/lecciones/nivel2/hueso.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/hueso.wav'), isCorrect: false },
    { id: '3', src: require('@/assets/images/lecciones/nivel2/reloj.png'),audio: require('@/assets/audio/levels/nivel2/audios_lesson1/reloj.wav'), isCorrect: true },
    { id: '4', src: require('@/assets/images/lecciones/nivel2/radio.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/radio.wav'),isCorrect: true },
    { id: '5', src: require('@/assets/images/lecciones/nivel2/hongo.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/hongo.wav'),isCorrect: false },
    { id: '6', src: require('@/assets/images/lecciones/nivel2/kiwi.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/kiwi.wav'),isCorrect: false},
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
        title="Rr"
        titleAudio={require('@assets/audio/levels/nivel1/lessons/G/G.wav')}
        practiceAudio={require('@/assets/audio/levels/nivel2/audios_lesson1/practice.wav')} 
        images={images}
        onTopBack={() => router.push('/(tabs)/Level2Screen')}
        // @ts-ignore
        onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion1/Qpractice')}
        // @ts-ignore
        onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/Spractice')}
      
    />
  );
}
