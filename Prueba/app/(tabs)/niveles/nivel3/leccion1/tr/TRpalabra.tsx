import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel3/leccion1/tr/trofeo.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/tr/trofeo.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/tr/tren.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/tr/tren.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/tr/trigo.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/tr/trigo.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/tr/tractor.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/tr/tractor.wav') },
            ]}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson1/tr/TRwords.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level3Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/tr/TRboard')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)//Level3Screen')}

        />
    );
}
