import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/nido.png'), audio: require('@assets/audio/levels/nivel1/lessons/N/nido.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/nariz.png'), audio: require('@assets/audio/levels/nivel1/lessons/N/nariz.wav') },
                { src: require('@assets/images/lecciones/nivel2/noche.png'), audio: require('@assets/audio/levels/nivel2/audios_lesson1/noche.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/gr/negro.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/gr/negro.wav') },
            ]}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/N/Npalabrainstruccion.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion2/Nn/Nsilabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion2/Nn2/N2learn')}

        />
    );
}