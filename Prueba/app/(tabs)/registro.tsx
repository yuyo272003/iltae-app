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
import axios, {AxiosError} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegistroScreen() {
    const [nombre, setNombre] = useState("");

    const handleRegister = async () => {
        if (!nombre.trim()) {
            Alert.alert("Error", "Por favor ingresa tu nombre.");
            return;
        }

        try {
            const response = await axios.post("http://192.168.0.20:8000/api/register", {
                name: nombre,
            });
            //poner tu ip

            const token = response.data.token;

            // Guardar el token para mantener sesión
            await AsyncStorage.setItem("auth_token", token);

            Alert.alert("¡Registro exitoso!");

            // Redirigir (ajustá esta ruta según tu navegación)
            router.push("/(tabs)/perfiles");

        } catch (error) {
            const err = error as AxiosError;

            console.log(err.response?.data || err.message);

            Alert.alert("Error", (err.response?.data as any)?.message || "Algo salió mal 😢");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileContainer}>
                <Ionicons name="person-circle" size={100} color="#1E6ADB" />
            </View>

            <Text style={styles.welcomeText}>¡Bienvenido!</Text>

            <TextInput
                style={styles.input}
                placeholder="Ingresa tu nombre"
                placeholderTextColor="#999"
                value={nombre}
                onChangeText={setNombre}
            />

            <TouchableOpacity style={styles.voiceButton}>
                <Ionicons name="mic" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.nextButton} onPress={handleRegister}>
                <Ionicons name="arrow-forward" size={24} color="white" />
            </TouchableOpacity>
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
    profileContainer: {
        marginBottom: 30,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#000",
    },
    input: {
        width: 327,
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
        width: 327,
        height: 48,
        backgroundColor: "#1E6ADB",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginBottom: 20,
    },
    nextButton: {
        width: 327,
        height: 48,
        backgroundColor: "#28C940",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
});
