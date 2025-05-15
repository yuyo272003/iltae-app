import React, { useCallback } from 'react';
import { router } from 'expo-router';
import SyllableScreen from '../../../../../components/SilabasMicrofono';
import { avanzarLeccion } from '@/utils/leassonProgress';

export default function LeccionManzana() {
    const handleNext = useCallback(async () => {
        try {
            // Llamamos al endpoint para avanzar a la lección 14
            await avanzarLeccion('/progreso/avanzar-leccion-14');
            // Luego navegamos de regreso al Level4Screen
            router.push('/(tabs)/Level4Screen');
        } catch (error) {
            console.error('Error al avanzar a lección 14:', error);
            // Opcional: mostrar alerta o toast al usuario
        }
    }, []);

    return (
        <SyllableScreen
            syllables={[
                { text: 'San', audio: require('@assets/audio/levels/nivel4/san.wav') },
                { text: 'día', audio: require('@assets/audio/levels/nivel4/dia.wav') },
            ]}
            targetWord="Sandia"
            practiceAudio={require('@assets/audio/levels/nivel4/instruction.wav')}
            successAudio={require('@assets/audio/levels/nivel4/correctopalabra.wav')}
            failureAudio={require('@assets/audio/levels/nivel4/fallopalabra.wav')}
            imageSource={require('@assets/images/lecciones/nivel2/sandia.png')}
            onTopBack={() => router.push('/(tabs)/Level4Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel4/leccion2/Radio')}
            onNext={handleNext}
        />
    );
}

