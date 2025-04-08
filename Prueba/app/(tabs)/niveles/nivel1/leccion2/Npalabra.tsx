import React from 'react';
import FourImagesAudio from '../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/letterN.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/O/Oboard.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/letterN.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/O/Oboard.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/letterN.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/O/Oboard.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/letterN.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/O/Oboard.wav') },
            ]}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/O/Oboard.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion2/Nsilabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion2/N2learn')}

        />
    );
}