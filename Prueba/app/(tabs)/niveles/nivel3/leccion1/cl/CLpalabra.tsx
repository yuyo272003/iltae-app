import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel3/leccion1/cl/clavo.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/cl/clavo.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/cl/bicicleta.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/cl/bicicleta.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/cl/closet.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/cl/closet.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/cl/eclipse.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/cl/eclipse.wav') },
            ]}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/M/Mpalabrainstruccion.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level3Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/cl/CLboard')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion1/cr/firstScreen')}

        />
    );
}
