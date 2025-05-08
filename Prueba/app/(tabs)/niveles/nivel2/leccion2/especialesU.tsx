import React, { useCallback } from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';
import { avanzarLeccion } from '@/utils/leassonProgress';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'cu', file: require('@assets/audio/levels/nivel2/audios_lesson2/cu.wav') },
        { syllable: 'hu', file: require('@assets/audio/levels/nivel2/audios_lesson2/hu.wav') },
        { syllable: 'yu', file: require('@assets/audio/levels/nivel2/audios_lesson2/yu.wav') },
        { syllable: 'wu', file: require('@assets/audio/levels/nivel2/audios_lesson2/wu.wav') },
    ];

    const handleNext = useCallback(async () => {
        try {
            // Llamamos al endpoint avanzar-leccion-8
            await avanzarLeccion('/progreso/avanzar-leccion-8');
            // Una vez exitoso, navegamos a la siguiente pantalla
            router.push('/(tabs)/niveles/nivel2/leccion3/firstScreen');
        } catch (error) {
            console.error('Error al avanzar a lección 8:', error);
            // Aquí podrías mostrar una alerta o toast al usuario
        }
    }, []);

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel1/actividad.wav')}
            onTopBack={() => router.push('/(tabs)/Level2Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel2/leccion2/especialesO')}
            onNext={handleNext}
        />
    );
}
