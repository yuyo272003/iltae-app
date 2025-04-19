import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import { router } from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio
            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/vaca.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/V/vaca.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/vestido.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/V/vestido.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/vino.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/V/vino.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/volcan.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/V/volcan.wav') },
            ]}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/V/Vpalabrainstruccion.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion6/Vv/Vsilabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion6/Ww/Wlearn')}
        />
    );
}
