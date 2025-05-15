import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/dado.png'), audio: require('@assets/audio/levels/nivel1/lessons/D/dado.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/diente.png'), audio: require('@assets/audio/levels/nivel1/lessons/D/diente.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/delfin.png'), audio: require('@assets/audio/levels/nivel1/lessons/D/delfin.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/dona.png'), audio: require('@assets/audio/levels/nivel1/lessons/D/dona.wav') },
            ]}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/D/Dpalabrainstruccion.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion3/Dd/Dsilabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion3/Gg/Glearn')}

        />
    );
}