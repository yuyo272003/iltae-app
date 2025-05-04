import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {router, usePathname} from "expo-router";
import PracticeImageAudioScreen from '../../../../../components/PracticeWordScreen';

export default function ScreenWord() {
  const images = [
    { id: '1', src: require('@/assets/images/lecciones/nivel2/cafe.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/cafe.wav'), isCorrect: false },
    { id: '2', src: require('@/assets/images/lecciones/nivel2/kiwi.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/kiwi.wav'), isCorrect: true },
    { id: '3', src: require('@/assets/images/lecciones/nivel2/karaoke.png'),audio: require('@/assets/audio/levels/nivel2/audios_lesson1/karaoke.wav'), isCorrect: false },
    { id: '4', src: require('@/assets/images/lecciones/nivel2/conejo.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/conejo.wav'),isCorrect: true },
    { id: '5', src: require('@/assets/images/lecciones/nivel2/bicicleta.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/bicicleta.wav'),isCorrect: true },
    { id: '6', src: require('@/assets/images/lecciones/nivel2/koala.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/koala.wav'),isCorrect: true},
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
        title="Kk"
        titleAudio={require('@assets/audio/levels/nivel1/lessons/G/G.wav')}
        practiceAudio={require('@/assets/audio/levels/nivel2/audios_lesson1/practice.wav')} 
        images={images}
        onTopBack={() => router.push('/(tabs)/Level2Screen')}
        // @ts-ignore
        onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion1/Jpractice')}
        // @ts-ignore
        onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/Lpractice')}
      
    />
  );
}
