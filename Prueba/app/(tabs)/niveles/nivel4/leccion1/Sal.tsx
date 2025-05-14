import React, { useCallback } from 'react';
import { router } from 'expo-router';
import SyllableScreen from '../../../../../components/SilabasMicrofono';
import { avanzarLeccion } from '@/utils/leassonProgress';

export default function LeccionSal() {
    const handleNext = useCallback(async () => {
        try {
            // Llamamos al endpoint para avanzar a la lección 13
            await avanzarLeccion('/progreso/avanzar-leccion-13');
            // Luego navegamos a la pantalla de nivel 4
            router.push('/(tabs)/Level4Screen');
        } catch (error) {
            console.error('Error al avanzar a lección 13:', error);
            // Aquí podrías mostrar un toast o alerta
        }
    }, []);

    return (
        <SyllableScreen
           syllables={[
                { text: 'Sal', audio: require('@assets/audio/levels/nivel4/sal.wav') }
            ]}
            targetWord="Sal"
            practiceAudio={require('@assets/audio/levels/nivel4/instruction.wav')}
            successAudio={require('@assets/audio/Todos.wav')}
            failureAudio={require('@assets/audio/Todos.wav')}
            imageSource={require('@assets/images/lecciones/nivel4/leccion1/monosilabas/sal.png')}
            onTopBack={() => router.push('/(tabs)/Level4Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel4/leccion1/Pez')}
            onNext={handleNext}
        />
    );
}

