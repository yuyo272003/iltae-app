import React from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import { router } from "expo-router";

export default function Leccion1() {
    return (
        <FourImagesAudio
            images={[
                { src: require('@assets/images/lecciones/nivel1/lessons/yate.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/Y/yate.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/yema.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/Y/yema.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/yogur.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/Y/yogur.wav') },
                { src: require('@assets/images/lecciones/nivel1/lessons/yoyo.png'), audio: require('@assets/audio/lecciones/nivel1/lessons/Y/yoyo.wav') },
            ]}
            practiceAudio={require('@assets/audio/lecciones/nivel1/lessons/Y/Ypalabrainstruccion.wav')}
            // @ts-ignore
            onTopBack={() => router.push('/(tabs)//Level1Screen')}
            // @ts-ignore
            onBottomBack={() => router.push('/(tabs)/niveles//nivel1/leccion6/Yy/Ysilabas')}
            // @ts-ignore
            onNext={() => router.push('/(tabs)/niveles/nivel1/leccion6/CompletionPractice')}
        />
    );
}
