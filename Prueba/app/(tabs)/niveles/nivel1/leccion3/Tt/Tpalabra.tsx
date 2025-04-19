import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/tapa.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/T/tapa.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/taza.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/T/taza.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/torre.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/T/torre.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/techo.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/T/techo.wav') },
            ]}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/T/Tpalabrainstruccion.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion3/Tt/Tsilabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion3/Pp/Plearn')}

        />
    );
}