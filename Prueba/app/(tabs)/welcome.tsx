import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import {router} from "expo-router"
import { LinearGradient } from "expo-linear-gradient";

const WelcomeScreen = () => {

    return (
        <LinearGradient colors={["#007AFF", "#0056B3"]} style={styles.container}>
            <Text style={styles.title}>MentorApp</Text>

            {/* Botón 1 */}
            <TouchableOpacity style={styles.button}>
                <Feather name="play" size={24} color="#007AFF" />
            </TouchableOpacity>

            {/* Botón 2: Navegar a Registro */}
            <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={() => router.push("/(tabs)/registro")} // Navegar a la pantalla de Registro
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