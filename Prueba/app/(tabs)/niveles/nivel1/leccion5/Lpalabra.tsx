import React from 'react';
import FourImagesAudio from '../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/lata.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/L/lata.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/luna.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/L/luna.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/leon.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/L/leon.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/limon.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/L/limon.wav') },

            ]}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/L/Lpalabrainsteruccion.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion5/Lsilabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion5/Llsilabas')}

        />
    );
}