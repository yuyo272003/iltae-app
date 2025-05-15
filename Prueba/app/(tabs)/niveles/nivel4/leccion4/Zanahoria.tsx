import React, { useCallback } from 'react';
import { router } from 'expo-router';
import SyllableScreen from '../../../../../components/SilabasMicrofono';
import { avanzarLeccion } from '@/utils/leassonProgress';

export default function LeccionZanahoria() {
    const handleNext = useCallback(async () => {
        try {
            // Avanzamos a la lección 16
            await avanzarLeccion('/progreso/avanzar-leccion-16');
            // Luego navegamos de regreso al Level4Screen
            router.push('/(tabs)/Level4Screen');
        } catch (error) {
            console.error('Error al avanzar a lección 16:', error);
            // Opcional: mostrar un toast o alerta al usuario
        }
    }, []);

    return (
        <SyllableScreen
            syllables={[
                { text: 'Za',   audio: require('@assets/audio/levels/nivel4/za.wav') },
                { text: 'na',   audio: require('@assets/audio/levels/nivel4/na.wav') },
                { text: 'ho',   audio: require('@assets/audio/levels/nivel4/ho.wav') },
                { text: 'ria',  audio: require('@assets/audio/levels/nivel4/ria.wav') },
            ]}
            targetWord="Zanahoria"
            practiceAudio={require('@assets/audio/levels/nivel4/instruction.wav')}
            successAudio={require('@assets/audio/levels/nivel4/correctopalabra.wav')}
            failureAudio={require('@assets/audio/levels/nivel4/fallopalabra.wav')}
            imageSource={require('@assets/images/lecciones/nivel2/zanahoria.png')}
            onTopBack={() => router.push('/(tabs)/Level4Screen')}
            onBottomBack={() => router.push('/(tabs)/niveles/nivel4/leccion4/Palomitas')}
            onNext={handleNext}
        />
    );
}

