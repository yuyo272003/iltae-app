import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel3/leccion1/pl/plegar.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/pl/plegar.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/pl/plato.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/pl/plato.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/pl/pluma.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/pl/pluma.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/pl/plomero.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/pl/plomero.wav') },
            ]}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson1/pl/PLwords.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level3Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/pl/PLboard')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion1/pr/firstScreen')}

        />
    );
}
