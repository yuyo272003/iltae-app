import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel3/leccion1/fl/chiflar.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/fl/chiflar.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/fl/flor.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/fl/flor.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/fl/flamenco.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/fl/flamenco.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/fl/flecha.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/fl/flecha.wav') },
            ]}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson1/fl/FLwords.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level3Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/fl/FLboard')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion1/fr/firstScreen')}

        />
    );
}
