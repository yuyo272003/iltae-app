import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/casa.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/C/casa.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/circo.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/C/circo.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/coco.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/C/coco.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/cuaderno.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/C/cuaderno.wav') },
            ]}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/C/Cpalabrainstruccion.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion6/Cc/Csilabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion6/Hh/Hlearn')}

        />
    );
}