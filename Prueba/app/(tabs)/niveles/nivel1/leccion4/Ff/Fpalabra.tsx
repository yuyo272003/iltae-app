import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/foca.png'), audio: require('@assets/audio/levels/nivel1/lessons/F/foca.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/familia.png'), audio: require('@assets/audio/levels/nivel1/lessons/F/familia.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/fuego.png'), audio: require('@assets/audio/levels/nivel1/lessons/F/fuego.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/feliz.png'), audio: require('@assets/audio/levels/nivel1/lessons/F/feliz.wav') },
            ]}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/F/Fpalabrainstruccion.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion4/Ff/Fsilabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion4/Jj/Jlearn')}

        />
    );
}