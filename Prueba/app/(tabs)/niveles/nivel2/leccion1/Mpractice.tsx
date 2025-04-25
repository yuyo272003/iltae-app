import React from 'react';

import {router} from "expo-router";
import PracticeImageAudioScreen from '../../../../../components/PracticeWordScreen';


export default function Leccion1() {
   return (
        <PracticeImageAudioScreen
        title="Pp"
        images={[
            { src: require('@/assets/images/paleta.png'), audio: require('@/assets/audio/paleta.wav') },
            { src: require('@/assets/images/pato.png'), audio: require('@/assets/audio/pato.wav') },
    
        ]}
        practiceAudio={require('@/assets/audio/practica_letra_p.wav')}
        onNext={() => router.push('/(tabs)/niveles/nivel2/leccion1/Npractice')}
        onTopBack={() => router.push('/(tabs)/niveles/nivel2/leccion1/Lpractice')}
        />
   )
}