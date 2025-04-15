import { Audio } from 'expo-av';

// Variable para mantener referencia al sonido actual
let currentSound: Audio.Sound | null = null;
// Variable para controlar el estado de reproducción
let isAudioPlaying: boolean = false;

// Callbacks para notificar cambios en el estado
type StatusCallback = (isPlaying: boolean) => void;
const statusCallbacks: StatusCallback[] = [];

/**
 * Reproduce un archivo de audio
 * @param uri Ruta al archivo de audio
 * @returns Promesa que se resuelve cuando comienza la reproducción
 */
export const playAudioGlobal = async (uri: any) => {
    try {
        // Detener audio previo si existe
        if (currentSound) {
            const status = await currentSound.getStatusAsync();
            if (status.isLoaded) {
                if (status.isPlaying) {
                    await currentSound.pauseAsync();
                    notifyStatusChange(false);
                    return; // Si solo pausamos, salimos aquí
                } else {
                    // Si está pausado, continuamos la reproducción
                    await currentSound.playAsync();
                    isAudioPlaying = true;
                    notifyStatusChange(true);
                    return;
                }
            }
            await currentSound.unloadAsync();
            currentSound = null;
        }

        // Crear y reproducir el nuevo audio
        const { sound } = await Audio.Sound.createAsync(uri);
        currentSound = sound;
        await sound.playAsync();
        isAudioPlaying = true;
        notifyStatusChange(true);

        // Configurar callback para cuando termine la reproducción
        sound.setOnPlaybackStatusUpdate(async (status) => {
            if (status.isLoaded && status.didJustFinish) {
                await sound.unloadAsync();
                if (currentSound === sound) {
                    currentSound = null;
                    isAudioPlaying = false;
                    notifyStatusChange(false);
                }
            }
        });

    } catch (error) {
        console.error('AudioManager play error:', error);
        isAudioPlaying = false;
        notifyStatusChange(false);
    }
};

/**
 * Detiene la reproducción del audio actual
 */
export const stopAudioGlobal = async () => {
    try {
        if (currentSound) {
            const status = await currentSound.getStatusAsync();
            if (status.isLoaded) {
                await currentSound.stopAsync();
                await currentSound.unloadAsync();
            }
            currentSound = null;
            isAudioPlaying = false;
            notifyStatusChange(false);
        }
    } catch (error) {
        console.error('AudioManager stop error:', error);
    }
};

/**
 * Pausa la reproducción del audio actual
 */
export const pauseAudioGlobal = async () => {
    try {
        if (currentSound) {
            const status = await currentSound.getStatusAsync();
            if (status.isLoaded && status.isPlaying) {
                await currentSound.pauseAsync();
                isAudioPlaying = false;
                notifyStatusChange(false);
            }
        }
    } catch (error) {
        console.error('AudioManager pause error:', error);
    }
};

/**
 * Verifica si hay audio reproduciéndose actualmente
 * @returns true si hay un audio reproduciéndose, false en caso contrario
 */
export const isAudioPlayingGlobal = () => {
    return isAudioPlaying;
};

/**
 * Registra un callback para recibir notificaciones de cambios de estado
 * @param callback Función a llamar cuando cambie el estado
 */
export const registerStatusCallback = (callback: StatusCallback) => {
    statusCallbacks.push(callback);
};

/**
 * Elimina un callback previamente registrado
 * @param callback Función registrada previamente
 */
export const unregisterStatusCallback = (callback: StatusCallback) => {
    const index = statusCallbacks.indexOf(callback);
    if (index !== -1) {
        statusCallbacks.splice(index, 1);
    }
};

/**
 * Notifica a todos los callbacks registrados sobre un cambio de estado
 * @param isPlaying Estado actual de reproducción
 */
const notifyStatusChange = (isPlaying: boolean) => {
    for (const callback of statusCallbacks) {
        callback(isPlaying);
    }
};