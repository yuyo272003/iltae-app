import React, { useCallback } from 'react';
import FourImagesAudio from '../../../../../../components/FourImagesAudio';
import { router } from 'expo-router';
import { avanzarLeccion } from '@/utils/leassonProgress';

export default function Leccion1() {
    const handleNext = useCallback(async () => {
        try {
            // Avanzamos a la lección 10 en el backend
            await avanzarLeccion('/progreso/avanzar-leccion-10');
            // Luego navegamos a la pantalla principal de nivel 3
            router.push('/(tabs)/Level3Screen');
        } catch (error) {
            console.error('Error al avanzar a lección 10:', error);
            // Opcional: mostrar alerta o toast al usuario
        }
    }, []);

    return (
        <FourImagesAudio
            images={[
                { src: require('@assets/images/lecciones/nivel3/leccion1/tr/trofeo.png'), audio: require('@assets/audio/levels/nivel3/audios_lesson1/tr/trofeo.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/tr/tren.png'),   audio: require('@assets/audio/levels/nivel3/audios_lesson1/tr/tren.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/tr/trigo.png'),   audio: require('@assets/audio/levels/nivel3/audios_lesson1/tr/trigo.wav') },
                { src: require('@assets/images/lecciones/nivel3/leccion1/tr/tractor.png'),audio: require('@assets/audio/levels/nivel3/audios_lesson1/tr/tractor.wav') },
            ]}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson1/tr/TRwords.wav')}

            onTopBack={() => router.push('/(tabs)/Level3Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion1/tr/TRboard')}
            onNext={handleNext}
        />
    );
}
