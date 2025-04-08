import React from 'react';
import FourImagesAudio from '../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/barco.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/B/barco.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/bota.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/B/bota.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/ballena.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/B/ballena.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/buho.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/B/buho.wav') },
            ]}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/B/Bpalabrainstruccion.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion3/Bsilabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion3/Tlearn')}

        />
    );
}