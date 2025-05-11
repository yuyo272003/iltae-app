import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel3/leccion1/gl/gluten.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/gl/gluten.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/gl/globo.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/gl/globo.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/gl/iglesia.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/gl/iglesia.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/gl/regla.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/gl/regla.wav') },
            ]}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson1/gl/GLwords.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level3Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/gl/GLboard')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion1/gr/firstScreen')}

        />
    );
}
