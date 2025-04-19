import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/sierra.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/S/sierra.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/sopa.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/S/sopa.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/sol.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/S/sol.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/silla.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/S/silla.wav') },
            ]}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/S/Spalabrainstruccion.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion4/Ss/Ssilabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion4/Xx/Xlearn')}

        />
    );
}