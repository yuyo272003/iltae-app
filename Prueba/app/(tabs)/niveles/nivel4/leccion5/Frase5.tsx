import React, { useCallback } from 'react';
import { router } from 'expo-router';
import SentenceSpeakingScreen from '@/components/SentenceSpeakingScreen';
import { avanzarLeccion } from '@/utils/leassonProgress';

export default function Leccion2() {
    const handleNext = useCallback(async () => {
        try {
            // Avanzamos a la lección 17
            await avanzarLeccion('/progreso/avanzar-leccion-17');
            // Luego navegamos al Level4Screen
            router.push('/(tabs)/Level4Screen');
        } catch (error) {
            console.error('Error al avanzar a lección 17:', error);
            // Opcional: mostrar un toast o alerta al usuario
        }
    }, []);

    return (
        <SentenceSpeakingScreen
            words={['yo', 'luna', 'veo', 'la']}
            targetPhrase="Yo veo la luna"
            practiceAudio={require('@assets/audio/levels/nivel4/instruccion5.wav')}
            successAudio={require('@assets/audio/levels/nivel4/correcto.wav')}
            failureAudio={require('@assets/audio/levels/nivel4/fallo.wav')}
            onTopBack={() => router.push('/(tabs)/Level4Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel4/leccion5/Frase4')}
            onNext={handleNext}
        />
    );
}
