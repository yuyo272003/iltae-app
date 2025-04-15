import React from 'react';
import FourImagesAudio from '../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/jaguar.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/J/jaguar.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/jirafa.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/J/jirafa.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/juguete.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/J/juguete.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/joya.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/J/joya.wav') },
            ]}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/J/Jpalabrainstruccion.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion4/Jsilabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion4/Slearn')}

        />
    );
}