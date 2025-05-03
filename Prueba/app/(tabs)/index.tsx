import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
    playAudioGlobal,
    stopAudioGlobal,
    isAudioPlayingGlobal,
    registerStatusCallback,
    unregisterStatusCallback
} from '@/utils/AudioManager';

const WelcomeScreen = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    // Configurar callback para sincronizar estado con AudioManager
    useEffect(() => {
        // Definir el callback
        const statusCallback = (playingStatus: boolean) => {
            setIsPlaying(playingStatus);
        };

        // Registrar el callback
        registerStatusCallback(statusCallback);

        // Verificar estado actual al montar
        setIsPlaying(isAudioPlayingGlobal());

        // Limpiar al desmontar
        return () => {
            stopAudioGlobal();
            unregisterStatusCallback(statusCallback);
        };
    }, []);

    const handlePlayPause = async () => {
        // Simplemente llamar a playAudioGlobal manejará tanto play como pause
        await playAudioGlobal(require("../../assets/audio/bienvenida.wav"));
    };

    // Función para manejar la navegación y detener el audio
    const handleNavigation = async (route: string) => {
        // Primero detener el audio
        await stopAudioGlobal();
        // Luego navegar a la ruta especificada
        // @ts-ignore
        router.push(route);
    };

    return (
        <LinearGradient colors={["#007AFF", "#0056B3"]} style={styles.container}>
            <Text style={styles.title}>ILTAE</Text>

            {/* Botón de reproducir/pausar */}
            <TouchableOpacity style={styles.button} onPress={handlePlayPause}>
                <Feather name={isPlaying ? "pause" : "play"} size={24} color="#007AFF" />
            </TouchableOpacity>

            {/* Botón para navegar a registro - Ahora usa handleNavigation */}
            <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={() => handleNavigation("/(tabs)/registro")}
            >
                <MaterialIcons name="arrow-forward" size={24} color="green" />
            </TouchableOpacity>

            {/* También actualizar este botón para detener el audio */}
            <TouchableOpacity onPress={() => handleNavigation("/(tabs)/login")}>
                <Text style={styles.link}>¿Y si sé leer y escribir?</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "white",
        marginBottom: 40,
    },
    button: {
        width: 327,
        height: 48,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonSecondary: {
        width: 327,
        height: 48,
        backgroundColor: "white",
        borderColor: "green",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 20,
    },
    link: {
        color: "white",
        textDecorationLine: "underline",
    },
});

export default WelcomeScreen;