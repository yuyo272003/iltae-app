import React from 'react';
import FourImagesAudio from '../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/llanta.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/L/llanta.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/llorar.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/L/llorar.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/lleno.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/L/lleno.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/lluvia.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/L/lluvia.wav') },
            ]}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/L/Llpalabrainstruccion.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion5/Llsilabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion5/Rlearn')}

        />
    );
}