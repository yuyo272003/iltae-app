import React, {useEffect, useState, useRef} from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";
import { useAuth } from "@/contexts/AuthContext";
import api from '@/scripts/api';
import { Audio, AVPlaybackSource} from "expo-av";

export default function RegistroScreen() {
    const [nombre, setNombre] = useState("");
    const {setUser} = useAuth();
    const [audio, setAudio] = useState<Audio.Sound | null>(null);
    const [isDictating, setIsDictating] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const inputRef = useRef<TextInput>(null);

    // 🧹 Detener y limpiar audio al desmontar
    useEffect(() => {
        return () => {
            if (audio) {
                audio.unloadAsync();
            }
        };
    }, [audio]);

    // Detectar cuando el teclado se muestra u oculta
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const reproducirAudio = async (audioFile: AVPlaybackSource) => {
        try {
            // Detenemos cualquier audio anterior
            if (audio) {
                await audio.stopAsync();
                await audio.unloadAsync();
            }

            const { sound } = await Audio.Sound.createAsync(audioFile);

            setAudio(sound);
            await sound.playAsync();
        } catch (error) {
            console.log("Error al reproducir audio:", error);
        }
    };

    const reproducirInstrucciones = async () => {
        await reproducirAudio(require('@/assets/audio/registro_instrucciones.wav'));
    };

    const reproducirInstruccionesDictado = async () => {
        await reproducirAudio(require('@/assets/audio/dictado_instrucciones.wav'));
    };

    const activateDictation = () => {
        setIsDictating(true);

        // Enfoca el input y muestra el teclado
        if (inputRef.current) {
            inputRef.current.focus();

            // Reproducir instrucciones de audio para dictado
            setTimeout(() => {
                reproducirInstruccionesDictado();
            }, 500); // Pequeño delay para asegurar que el teclado esté visible
        }
    };

    const deactivateDictation = () => {
        setIsDictating(false);
        Keyboard.dismiss();
    };

    const handleRegister = async () => {
        if (!nombre.trim()) {
            Alert.alert("Error", "Por favor ingresa tu nombre.");
            return;
        }

        try {
            const response = await api.post('/register', {
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
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <Ionicons name="arrow-back" size={28} color="blue" />
            </TouchableOpacity>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoid}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={[
                        styles.content,
                        keyboardVisible && styles.contentWithKeyboard
                    ]}>
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
                            ref={inputRef}
                            style={styles.input}
                            placeholder="Ingresa tu nombre"
                            placeholderTextColor="#999"
                            value={nombre}
                            onChangeText={setNombre}
                            autoFocus={false}
                            returnKeyType="done"
                            blurOnSubmit={true}
                            onSubmitEditing={deactivateDictation}
                        />

                        <TouchableOpacity
                            style={[styles.voiceButton, isDictating && styles.dictatingButton]}
                            onPress={isDictating ? deactivateDictation : activateDictation}
                        >
                            <Ionicons name="mic" size={24} color="white" />
                            <Text style={styles.voiceButtonText}>
                                {isDictating ? "" : ""}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.nextButton} onPress={handleRegister}>
                            <Ionicons name="arrow-forward" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EEF3FF",
    },
    keyboardAvoid: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: "center",
        paddingTop: 120, // Dejamos espacio para el botón de retroceso
        paddingBottom: 30,
    },
    content: {
        width: 327,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    contentWithKeyboard: {
        paddingTop: 10, // Reduce el espacio superior cuando el teclado está visible
    },
    profileContainer: {
        alignSelf: "center",
        marginBottom: 20, // Reducido del original
    },
    headerSection: {
        width: "100%",
        marginBottom: 15, // Reducido del original
    },
    speakerButton: {
        backgroundColor: "#1E6ADB",
        width: 52,
        height: 30,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15, // Reducido del original
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginBottom: 15, // Reducido del original
    },
    dictatingButton: {
        backgroundColor: "#FF5252",
    },
    voiceButtonText: {
        color: "white",
        marginLeft: 10,
        fontSize: 16,
    },
    nextButton: {
        width: "100%",
        height: 48,
        backgroundColor: "#28C940",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 2,
    },
});