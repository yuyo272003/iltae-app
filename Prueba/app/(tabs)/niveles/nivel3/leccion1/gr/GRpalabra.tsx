import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel3/leccion1/gr/grifo.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/gr/grifo.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/gr/cangrejo.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/gr/cangrejo.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/gr/granja.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/gr/granja.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/gr/negro.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/gr/negro.wav') },
            ]}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson1/gr/GRwords.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level3Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/gr/GRboard')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion1/pl/firstScreen')}

        />
    );
}
