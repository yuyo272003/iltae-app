import React, { useCallback } from 'react';
import { router } from 'expo-router';
import SyllableScreen from '../../../../../components/SilabasMicrofono';
import { avanzarLeccion } from '@/utils/leassonProgress';

export default function LeccionTomate() {
    const handleNext = useCallback(async () => {
        try {
            // Llamamos al endpoint para avanzar a la lección 15
            await avanzarLeccion('/progreso/avanzar-leccion-15');
            // Luego navegamos de regreso al Level4Screen
            router.push('/(tabs)/Level4Screen');
        } catch (error) {
            console.error('Error al avanzar a lección 15:', error);
            // Opcional: mostrar un toast o alerta al usuario
        }
    }, []);

    return (
        <SyllableScreen
            syllables={[
                { text: 'To', audio: require('@assets/audio/levels/nivel4/to.wav') },
                { text: 'ma', audio: require('@assets/audio/levels/nivel4/ma.wav') },
                { text: 'te', audio: require('@assets/audio/levels/nivel4/te.wav') },
            ]}
            targetWord="Tomate"
            practiceAudio={require('@assets/audio/levels/nivel4/instruction.wav')}
            successAudio={require('@assets/audio/levels/nivel4/correctopalabra.wav')}
            failureAudio={require('@assets/audio/levels/nivel4/fallopalabra.wav')}
            imageSource={require('@assets/images/lecciones/nivel2/tomate.png')}
            onTopBack={() => router.push('/(tabs)/Level4Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel4/leccion3/Paleta')}
            onNext={handleNext}
        />
    );
}

