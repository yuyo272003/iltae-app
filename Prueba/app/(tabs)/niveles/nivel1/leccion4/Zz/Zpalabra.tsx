import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/zapato.png'), audio: require('@assets/audio/levels/nivel1/lessons/Z/zapato.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/zorro.png'), audio: require('@assets/audio/levels/nivel1/lessons/Z/zorro.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/zombie.png'), audio: require('@assets/audio/levels/nivel1/lessons/Z/zombie.wav') },

            ]}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/Z/Zpalabrainstruccion.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion4/Zz/Zsilabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion4/CompletionPractice')}

        />
    );
}