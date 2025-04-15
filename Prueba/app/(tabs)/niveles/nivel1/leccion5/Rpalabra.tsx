import React from 'react';
import FourImagesAudio from '../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/raton.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/R/raton.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/robot.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/R/robot.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/regalo.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/R/regalo.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/ruleta.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/R/ruleta.wav') },

            ]}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/R/Rpalabrainstruccion.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion5/Rsilabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion5/Rrsilabas')}

        />
    );
}