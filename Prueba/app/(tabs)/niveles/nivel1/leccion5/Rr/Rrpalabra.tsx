import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/carrusel.png'), audio: require('@assets/audio/levels/nivel1/lessons/R/carrusel.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/gorra.png'), audio: require('@assets/audio/levels/nivel1/lessons/R/gorra.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/jarron.png'), audio: require('@assets/audio/levels/nivel1/lessons/R/jarron.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/carro.png'), audio: require('@assets/audio/levels/nivel1/lessons/R/carro.wav') },

            ]}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/R/Rrpalabrainstruccion.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion5/Rr/Rrsilabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion5/CompletionPractice')}

        />
    );
}