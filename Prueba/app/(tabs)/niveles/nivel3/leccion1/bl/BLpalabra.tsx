import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel3/leccion1/bl/biblioteca.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/bl/biblioteca.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/bl/blusa.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/bl/blusa.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/bl/establo.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/bl/establo.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/bl/cable.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/bl/cable.wav') },
            ]}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson1/bl/BLwords.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level3Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/bl/BLboard')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion1/ch/firstScreen')}

        />
    );
}
