import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/saxofon.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/X/saxofon.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/xilofono.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/X/xilofono.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/taxi.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/X/taxi.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/mexico.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/X/mexico.wav') },
            ]}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/X/Xpalabrainstruccion.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion4/Xx/Xsilabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion4/Zz/Zlearn')}

        />
    );
}