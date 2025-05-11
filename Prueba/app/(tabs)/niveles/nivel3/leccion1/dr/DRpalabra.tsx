import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel3/leccion1/dr/taladro.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/dr/taladro.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/dr/dragon.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/dr/dragon.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/dr/padre.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/dr/padre.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/dr/ladrillo.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/dr/ladrillo.wav') },
            ]}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson1/dr/DRwords.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level3Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/dr/DRboard')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion1/fl/firstScreen')}

        />
    );
}
