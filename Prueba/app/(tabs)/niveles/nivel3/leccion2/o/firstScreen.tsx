import React, { useCallback } from 'react';
import SyllableMatchGame from '@/components/SyllableMatchGame';
import { router } from 'expo-router';
import { avanzarLeccion } from '@/utils/leassonProgress';

export default function SyllablesGame() {
    // Definimos los pares de sílabas para esta lección específica
    const syllablePairs = [
        { syllable: 'blo', file: require('@assets/audio/levels/nivel3/audios_lesson2/o/blo.wav') },
        { syllable: 'clo', file: require('@assets/audio/levels/nivel3/audios_lesson2/o/clo.wav') },
        { syllable: 'flo', file: require('@assets/audio/levels/nivel3/audios_lesson2/o/flo.wav') },
        { syllable: 'glo', file: require('@assets/audio/levels/nivel3/audios_lesson2/o/glo.wav') },
        { syllable: 'plo', file: require('@assets/audio/levels/nivel3/audios_lesson2/o/plo.wav') },
        { syllable: 'tlo', file: require('@assets/audio/levels/nivel3/audios_lesson2/o/tlo.wav') },
        { syllable: 'cho', file: require('@assets/audio/levels/nivel3/audios_lesson2/o/cho.wav') },
    ];

    const handleNext = useCallback(async () => {
        try {
            // Llamamos al endpoint para avanzar a la lección 11
            await avanzarLeccion('/progreso/avanzar-leccion-11');
            // Luego navegamos de regreso al Level3Screen (o la ruta que corresponda)
            router.push('/(tabs)/Level3Screen');
        } catch (error) {
            console.error('Error al avanzar a lección 11:', error);
            // Opcional: mostrar un toast o alerta al usuario
        }
    }, []);

    return (
        <SyllableMatchGame
            syllablePairs={syllablePairs}
            practiceAudio={require('@assets/audio/levels/nivel3/audios_lesson2/practice.wav')}
            onTopBack={() => router.push('/(tabs)/Level3Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel3/leccion2/i/silabasRI')}
            onNext={handleNext}
        />
    );
}
