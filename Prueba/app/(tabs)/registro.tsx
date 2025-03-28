import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";
import { useAuth } from "@/contexts/AuthContext"; // ajusta la ruta si cambia


export default function RegistroScreen() {
    const [nombre, setNombre] = useState("");
    const { setUser } = useAuth();


    const reproducirInstrucciones = () => {
        const mensaje =
            "¡Bienvenido! Aquí te registraras usando el microfono azul que encontraras abajo.";
        Speech.speak(mensaje, { language: "es-ES" });
    };

    const handleRegister = async () => {
        if (!nombre.trim()) {
            Alert.alert("Error", "Por favor ingresa tu nombre.");
            return;
        }

        try {
            const response = await axios.post("http://148.226.202.122:8000/api/register", {
                name: nombre,
            });

            const { token, user } = response.data;

            await AsyncStorage.setItem("auth_token", token);
            setUser(user); // 🔥 AuthContext en acción

            Alert.alert("¡Registro exitoso!");
            router.push("/(tabs)/perfiles");

        } catch (error) {
            const err = error as AxiosError;
            console.log(err.response?.data || err.message);

            Alert.alert(
                "Error",
                (err.response?.data as any)?.message || "Algo salió mal 😢"
            );
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.profileContainer}>
                    <Ionicons name="person-circle" size={100} color="#1E6ADB" />
                </View>

                <View style={styles.headerSection}>
                    <TouchableOpacity style={styles.speakerButton} onPress={reproducirInstrucciones}>
                        <Ionicons name="volume-high" size={20} color="white" />
                    </TouchableOpacity>

                    <Text style={styles.welcomeText}>¡Bienvenido!</Text>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Ingresa tu nombre"
                    placeholderTextColor="#999"
                    value={nombre}
                    onChangeText={setNombre}
                    autoFocus={false}
                    returnKeyType="done"
                    blurOnSubmit={true}
                />

                <TouchableOpacity
                    style={styles.voiceButton}
                    onPress={() =>
                        Alert.alert(
                            "Dictado",
                            "Presiona el ícono del micrófono en tu teclado para dictar tu nombre."
                        )
                    }
                >
                    <Ionicons name="mic" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.nextButton} onPress={handleRegister}>
                    <Ionicons name="arrow-forward" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EEF3FF",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    content: {
        width: 327,
        alignItems: "flex-start",
    },
    profileContainer: {
        alignSelf: "center",
        marginBottom: 30,
    },
    headerSection: {
        width: "100%",
        marginBottom: 20,
    },
    speakerButton: {
        backgroundColor: "#1E6ADB",
        width: 52,
        height: 30,
        borderRadius: 20, // para hacerlo circular
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,

    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#000",
    },
    input: {
        width: "100%",
        height: 48,
        backgroundColor: "white",
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    voiceButton: {
        width: "100%",
        height: 48,
        backgroundColor: "#1E6ADB",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginBottom: 20,
    },
    nextButton: {
        width: "100%",
        height: 48,
        backgroundColor: "#28C940",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
});
