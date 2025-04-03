import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";

const WelcomeScreen = () => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false); // Estado para saber si está sonando
    const [isPaused, setIsPaused] = useState(false);   // Estado para saber si está pausado

    const handlePlayPause = async () => {
        if (sound && isPlaying) {
            await sound.pauseAsync();       // Pausar el audio
            setIsPlaying(false);
            setIsPaused(true);
        } else if (sound && isPaused) {
            await sound.playAsync();        // Reanudar desde donde se pausó
            setIsPlaying(true);
            setIsPaused(false);
        } else {
            // Si no hay sonido cargado, lo cargamos y lo reproducimos
            const { sound: newSound } = await Audio.Sound.createAsync(
                require("../../assets/audio/bienvenida.wav") // reemplaza con tu ruta
            );
            setSound(newSound);
            await newSound.playAsync();
            setIsPlaying(true);

            // Limpieza automática al terminar
            newSound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    setIsPlaying(false);
                    setIsPaused(false);
                }
            });
        }
    };

    return (
        <LinearGradient colors={["#007AFF", "#0056B3"]} style={styles.container}>
            <Text style={styles.title}>MentorApp</Text>

            {/* Botón de reproducir/pausar */}
            <TouchableOpacity style={styles.button} onPress={handlePlayPause}>
                <Feather name={isPlaying ? "pause" : "play"} size={24} color="#007AFF" />
            </TouchableOpacity>

            {/* Botón para navegar a registro */}
            <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={() => router.push("/(tabs)/registro")}
            >
                <MaterialIcons name="arrow-forward" size={24} color="green" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/(tabs)/login")}>
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
