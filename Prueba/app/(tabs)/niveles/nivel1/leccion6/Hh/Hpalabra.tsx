import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/hacha.png'), audio: require('@assets/audio/levels/nivel1/lessons/H/hacha.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/helado.png'), audio: require('@assets/audio/levels/nivel1/lessons/H/helado.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/hongo.png'), audio: require('@assets/audio/levels/nivel1/lessons/H/hongo.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/hueso.png'), audio: require('@assets/audio/levels/nivel1/lessons/H/hueso.wav') },
            ]}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/H/Hpalabrainstruccion.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion6/Hh/Hsilabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion6/Qq/Qlearn')}

        />
    );
}