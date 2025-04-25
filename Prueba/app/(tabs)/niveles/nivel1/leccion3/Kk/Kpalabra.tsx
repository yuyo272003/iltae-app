import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/karaoke.png'), audio: require('@assets/audio/levels/nivel1/lessons/K/karaoke.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/kiwi.png'), audio: require('@assets/audio/levels/nivel1/lessons/K/kiwi.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/koala.png'), audio: require('@assets/audio/levels/nivel1/lessons/K/koala.wav') },

            ]}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/K/Kpalabrainstruccion.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion3/Kk/Ksilabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion3/CompletionPractice')}

        />
    );
}