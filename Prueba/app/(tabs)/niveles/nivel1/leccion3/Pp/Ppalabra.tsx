import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/pala.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/P/pala.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/pato.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/P/pato.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/peine.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/P/peine.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/papá.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/P/papá.wav') },
            ]}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/P/Ppalabrainstruccion.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion3/Pp/Psilabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion3/Tt/Tlearn')}

        />
    );
}