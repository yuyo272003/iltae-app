// src/utils/AudioManager.ts
import { Audio } from 'expo-av';

let currentSound: Audio.Sound | null = null;

export const playAudioGlobal = async (uri: any) => {
    try {
        if (currentSound) {
            const status = await currentSound.getStatusAsync();
            if (status.isLoaded) {
                await currentSound.stopAsync();
                await currentSound.unloadAsync();
            }
        }
        const { sound } = await Audio.Sound.createAsync(uri);
        currentSound = sound;
        await sound.playAsync();
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
