import { Audio } from 'expo-av';

let currentSound: Audio.Sound | null = null;

export const playAudioGlobal = async (uri: any) => {
    try {
        // ⛔ Detener y limpiar audio anterior si existe
        if (currentSound) {
            const status = await currentSound.getStatusAsync();
            if (status.isLoaded) {
                await currentSound.stopAsync();
                await currentSound.unloadAsync();
            }
            currentSound = null;
        }

        // ✅ Crear y reproducir el nuevo audio
        const { sound } = await Audio.Sound.createAsync(uri);
        currentSound = sound;
        await sound.playAsync();

        // ♻️ Limpiar cuando termine
        sound.setOnPlaybackStatusUpdate(async (status) => {
            if (status.isLoaded && status.didJustFinish) {
                await sound.unloadAsync();
                if (currentSound === sound) {
                    currentSound = null;
                }
            }
        });

    } catch (error) {
        console.error('AudioManager play error:', error);
    }
};

export const stopAudioGlobal = async () => {
    try {
        if (currentSound) {
            const status = await currentSound.getStatusAsync();
            if (status.isLoaded) {
                await currentSound.stopAsync();
                await currentSound.unloadAsync();
            }
            currentSound = null;
        }
    } catch (error) {
        console.error('AudioManager stop error:', error);
    }
};
