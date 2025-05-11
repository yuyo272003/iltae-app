import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel3/leccion1/fr/frutas.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/fr/frutas.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/fr/frasco.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/fr/frasco.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/fr/frio.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/fr/frio.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/fr/fresa.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/fr/fresa.wav') },
            ]}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson1/fr/FRwords.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level3Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/fr/FRboard')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion1/gl/firstScreen')}

        />
    );
}
