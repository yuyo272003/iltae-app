import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel3/leccion1/br/cebra.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/br/cebra.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/br/libreta.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/br/libreta.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/br/libro.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/br/libro.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/br/bruja.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/br/bruja.wav') },
            ]}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson1/br/BRwords.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level3Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/br/BRboard')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion1/ch/firstScreen')}

        />
    );
}
