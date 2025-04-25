import React from 'react';

import {router} from "expo-router";
import PracticeImageAudioScreen from '../../../../../components/PracticeWordScreen';


export default function Leccion1() {
   return (
        <PracticeImageAudioScreen
        title="Mm"
        images={[
            { src: require('@/assets/images/lecciones/nivel2/mariposa.png'), audio: require('@/assets/audio/levels/nivel2/audios_lesson1/mariposa.wav') },
        ]}
        practiceAudio={require('@/assets/audio/practica_letra_p.wav')} // falta modificar estooo
        onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/Npractice')}
        onTopBack={() => router.push('/(tabs)/niveles/nivel2/leccion1/Lpractice')}
        />
   )
}