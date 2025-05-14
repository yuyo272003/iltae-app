import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import {router} from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio

            images={[
                { src: require('@assets/images/lecciones/nivel2/piña.png'), audio: require('@assets/audio/levels/nivel2/audios_lesson1/piña.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/puño.png'), audio: require('@assets/audio/levels/nivel1/lessons/Ñ/puño.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/uña.png'), audio: require('@assets/audio/levels/nivel1/lessons/Ñ/Uña.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/moño.png'), audio: require('@assets/audio/levels/nivel1/lessons/Ñ/moño.wav') },
            ]}
            practiceAudio={require('@assets/audio/levels/nivel1/lessons/Ñ/Ñpalabrainstruccion.wav')}

            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion2/Nn2/N2silabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion2/CompletionPractice')}

        />
    );
}