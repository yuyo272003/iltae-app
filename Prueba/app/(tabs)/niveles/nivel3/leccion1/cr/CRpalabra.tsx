import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel3/leccion1/cr/crayolas.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/cr/crayolas.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/cr/escribir.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/cr/escribir.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/cr/croquis.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/cr/croquis.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/cr/cruz.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/cr/cruz.wav') },
            ]}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson1/cr/CRwords.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level3Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/cr/CRboard')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion1/dr/firstScreen')}

        />
    );
}
