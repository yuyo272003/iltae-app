import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel3/leccion1/ch/chaleco.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/ch/chaleco.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/ch/chile.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/ch/chile.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/ch/chocolate.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/ch/chocolate.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/ch/chupon.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/ch/chupon.wav') },
            ]}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson1/ch/CHwords.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level3Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/ch/CHboard')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion1/cl/firstScreen')}

        />
    );
}
