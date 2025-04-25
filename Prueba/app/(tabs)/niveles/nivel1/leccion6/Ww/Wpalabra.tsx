import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import { router } from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio
            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/waffles.png'), audio: require('@assets/audio/levels/nivel1/lessons/W/waffle.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/web.png'), audio: require('@assets/audio/levels/nivel1/lessons/W/web.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/wifi.png'), audio: require('@assets/audio/levels/nivel1/lessons/W/wifi.wav') },
            ]}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/W/Wpalabrainstruccion.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion6/Ww/Wsilabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion6/Yy/Ylearn')}
        />
    );
}
