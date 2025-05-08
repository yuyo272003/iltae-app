import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/mano.png'), audio: require('@assets/audio/levels/nivel1/lessons/M/mano.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/mesa.png'), audio: require('@assets/audio/levels/nivel1/lessons/M/mesa.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/moto.png'), audio: require('@assets/audio/levels/nivel1/lessons/M/Moto.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/mujer.png'), audio: require('@assets/audio/levels/nivel1/lessons/M/mujer.wav') },
            ]}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/M/Mpalabrainstruccion.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/fl/FLboard')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion1/fr/firstScreen')}

        />
    );
}
