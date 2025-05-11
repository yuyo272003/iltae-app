import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel3/leccion1/tl/atleta.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/tl/atleta.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/tl/chipotle.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/tl/chipotle.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/tl/tlacuache.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/tl/tlacuache.wav') },
            ]}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson1/tl/TLwords.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level3Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/tl/TLboard')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel3/leccion1/tr/firstScreen')}

        />
    );
}
