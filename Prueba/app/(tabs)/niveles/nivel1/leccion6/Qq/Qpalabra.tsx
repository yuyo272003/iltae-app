import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/queso.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/Q/queso.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/quimica.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/Q/quimica.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/quince.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/Q/quince.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/quemado.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/Q/quemado.wav') },
            ]}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/Q/Qpalabrainstruccion.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion6/Qq/Qsilabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion6/Vv/Vlearn')}

        />
    );
}