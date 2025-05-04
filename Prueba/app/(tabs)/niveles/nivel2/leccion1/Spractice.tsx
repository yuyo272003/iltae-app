import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {router, usePathname} from "expo-router";
import PracticeImageAudioScreen from '../../../../../components/PracticeWordScreen';

export default function PantallaLetra() {
  const images = [
    { id: '1', src: require('@/assets/images/lecciones/nivel2/jarra.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/jarra.wav'), isCorrect: false },
    { id: '2', src: require('@/assets/images/lecciones/nivel2/sandia.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/sandia.wav'), isCorrect: true },
    { id: '3', src: require('@/assets/images/lecciones/nivel2/cereza.png'),audio: require('@/assets/audio/levels/nivel2/audios_lesson1/cereza.wav'), isCorrect: false },
    { id: '4', src: require('@/assets/images/lecciones/nivel2/sol.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/sol.wav'),isCorrect: true },
    { id: '5', src: require('@/assets/images/lecciones/nivel2/silla.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/silla.wav'),isCorrect: true },
    { id: '6', src: require('@/assets/images/lecciones/nivel2/serpiente.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/serpiente.wav'),isCorrect: true},
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
        title="Ss"
        titleAudio={require('@assets/audio/levels/nivel1/lessons/G/G.wav')}
        practiceAudio={require('@/assets/audio/levels/nivel2/audios_lesson1/practice.wav')} 
        images={images}
        onTopBack={() => router.push('/(tabs)/Level2Screen')}
        // @ts-ignore
        onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion1/Rpractice')}
        // @ts-ignore
        onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/Tpractice')}
      
    />
  );
}
