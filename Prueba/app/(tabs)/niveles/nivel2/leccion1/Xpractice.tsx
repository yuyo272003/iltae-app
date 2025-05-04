import React, {useEffect} from 'react';
import {router, usePathname} from "expo-router";
import PracticeImageAudioScreen from '../../../../../components/PracticeWordScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PantallaLetra() {
  const images = [
    { id: '1', src: require('@/assets/images/lecciones/nivel2/xilofono.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/xilofono.wav'), isCorrect: true },
    { id: '2', src: require('@/assets/images/lecciones/nivel2/sol.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/sol.wav'), isCorrect: false },
    { id: '3', src: require('@/assets/images/lecciones/nivel2/saxofon.png'),audio: require('@/assets/audio/levels/nivel2/audios_lesson1/saxofon.wav'), isCorrect: true },
    { id: '4', src: require('@/assets/images/lecciones/nivel2/taxi.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/taxi.wav'),isCorrect: true },
    { id: '5', src: require('@/assets/images/lecciones/nivel2/piña.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/piña.wav'),isCorrect: false },
    { id: '6', src: require('@/assets/images/lecciones/nivel2/serpiente.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/serpiente.wav'),isCorrect: false},
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
        title="Xx"
        titleAudio={require('@assets/audio/levels/nivel1/lessons/G/G.wav')}
        practiceAudio={require('@/assets/audio/levels/nivel2/audios_lesson1/practice.wav')} 
        images={images}
        onTopBack={() => router.push('/(tabs)/Level2Screen')}
        // @ts-ignore
        onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion1/Wpractice')}
        // @ts-ignore
        onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/Ypractice')}
      
    />
  );
}
