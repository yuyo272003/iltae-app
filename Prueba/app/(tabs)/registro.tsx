import React from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {router} from "expo-router";

export default function RegistroScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileContainer}>
                <Ionicons name="person-circle" size={100} color="#1E6ADB" />
            </View>

            <Text style={styles.welcomeText}>¡Bienvenido!</Text>

            <TextInput style={styles.input} placeholder="Ingresa tu nombre" placeholderTextColor="#999" />

            <TouchableOpacity style={styles.voiceButton}>
                <Ionicons name="mic" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.nextButton}
                              onPress={() => router.push("/(tabs)/perfiles")} >
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
        paddingVertical: 20, // Añadir algo de padding vertical para más espacio
    },
    profileContainer: {
        marginBottom: 30, // Espacio entre el ícono y el siguiente texto
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
