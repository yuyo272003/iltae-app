import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel3/leccion1/pr/profesor.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/pr/profesor.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/pr/precio.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/pr/precio.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/pr/prueba.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/pr/prueba.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/pr/compras.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/pr/compras.wav') },
            ]}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson1/pr/PRwords.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level3Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/pr/PRboard')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion1/tl/firstScreen')}

        />
    );
}
