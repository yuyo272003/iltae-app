import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/nube.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/N/nube.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/nariz.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/N/nariz.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/naranja.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/N/naranja.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/negro.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/N/negro.wav') },
            ]}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/N/Npalabrainstruccion.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion2/Nn/Nsilabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion2/Nn2/N2learn')}

        />
    );
}