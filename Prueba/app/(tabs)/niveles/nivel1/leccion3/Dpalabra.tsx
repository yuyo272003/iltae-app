import React from 'react';
import FourImagesAudio from '../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/dado.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/D/dado.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/diente.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/D/diente.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/disco.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/D/disco.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/dulce.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/D/dulce.wav') },
            ]}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/D/Dpalabrainstruccion.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion3/Dsilabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion3/Glearn')}

        />
    );
}