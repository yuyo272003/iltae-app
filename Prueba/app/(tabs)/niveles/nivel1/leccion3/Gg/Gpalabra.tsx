import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/gato.png'), audio: require('@assets/audio/levels/nivel1/lessons/G/gato.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/agua.png'), audio: require('@assets/audio/levels/nivel1/lessons/G/agua.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/gelatina.png'), audio: require('@assets/audio/levels/nivel1/lessons/G/gelatina.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/girasol.png'), audio: require('@assets/audio/levels/nivel1/lessons/G/girasol.wav') },
            ]}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/G/Gpalabrainstruccion.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion3/Gg/Gsilabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion3/Kk/Klearn')}

        />
    );
}