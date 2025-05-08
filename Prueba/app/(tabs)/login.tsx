import React, { useState, useRef, useEffect, useCallback } from "react";
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
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/scripts/api";
import { Audio, AVPlaybackSource } from "expo-av";
import {
    playAudioGlobal,
    stopAudioGlobal,
    registerStatusCallback,
    unregisterStatusCallback,
    isAudioPlayingGlobal,
} from "@/utils/AudioManager";
import { PermissionsAndroid, Platform } from 'react-native';
// **Nuevo import** para reconocimiento de voz
import Voice from "@react-native-voice/voice";

export default function LoginScreen() {
    const [nombre, setNombre] = useState("");
    const { setUser } = useAuth();
    const [isDictating, setIsDictating] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(isAudioPlayingGlobal());
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const inputRef = useRef<TextInput>(null);

    // Pausar audio cuando pierda foco
    useFocusEffect(
        useCallback(() => {
            return () => stopAudioGlobal();
        }, [])
    );

    // Callbacks de AudioManager (altavoz)
    useEffect(() => {
        const statusCb = (playing: boolean) => setIsAudioPlaying(playing);
        registerStatusCallback(statusCb);
        return () => {
            unregisterStatusCallback(statusCb);
            stopAudioGlobal();
        };
    }, []);

    // Listeners teclado
    useEffect(() => {
        const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
        const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    // --- Voice Listeners ---
    useEffect(() => {
        Voice.onSpeechStart = () => setIsDictating(true);
        Voice.onSpeechResults = (e) => {
            const text = e.value?.[0] ?? "";
            setNombre(text);
        };
        Voice.onSpeechError = (e) => {
            console.warn("Voice error:", e);
            setIsDictating(false);
        };
        return () => {
            Voice.destroy().then(() => Voice.removeAllListeners());
        };
    }, []);

    async function requestAudioPermission() {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    title: "Permiso de micrófono",
                    message: "La app necesita acceder al micrófono para dictar tu nombre.",
                    buttonNegative: "Cancelar",
                    buttonPositive: "Aceptar",
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    }

    const startRecognizing = async () => {
        // 1️⃣ pide permiso
        const ok = await requestAudioPermission();
        if (!ok) {
            Alert.alert("Permiso denegado", "No podemos usar el micrófono sin permiso.");
            return;
        }
        // 2️⃣ arranca el dictado
        try {
            await Voice.start("es-MX");
            inputRef.current?.focus();
        } catch (e) {
            console.error("Voice.start error:", e);
        }
    };

    const stopRecognizing = async () => {
        try {
            await Voice.stop();
        } catch (e) {
            console.error("stopRecognizing error:", e);
        } finally {
            setIsDictating(false);
            Keyboard.dismiss();
        }
    };
    // -----------------------

    // Reproduce instrucciones de login
    const reproducirInstrucciones = () => {
        playAudioGlobal(require("@/assets/audio/registro_instrucciones.wav"));
    };

    const handleLogin = async () => {
        if (!nombre.trim()) {
            Alert.alert("Error", "Por favor ingresa tu nombre.");
            return;
        }
        try {
            const response = await api.post("/login", { name: nombre });
            const { user, token, niveles_completados } = response.data;
            await AsyncStorage.setItem("auth_token", token);
            setUser({ ...user, niveles_completados });
            router.push("/(tabs)/perfiles");
        } catch (error: any) {
            Alert.alert(
                "Error",
                error.response?.data?.message || "No se pudo iniciar sesión 😢"
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
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
                    <View style={[styles.content, keyboardVisible && styles.contentWithKeyboard]}>
                        <View style={styles.profileContainer}>
                            <Ionicons name="person-circle" size={100} color="#1E6ADB" />
                        </View>

                        <View style={styles.headerSection}>
                            <TouchableOpacity style={styles.speakerButton} onPress={reproducirInstrucciones}>
                                <Ionicons
                                    name={isAudioPlaying ? "pause" : "volume-high"}
                                    size={20}
                                    color="white"
                                />
                            </TouchableOpacity>
                            <Text style={styles.welcomeText}>¡Iniciar Sesión!</Text>
                        </View>

                        <TextInput
                            ref={inputRef}
                            style={styles.input}
                            placeholder="Ingresa tu nombre"
                            placeholderTextColor="#999"
                            value={nombre}
                            onChangeText={setNombre}
                            returnKeyType="done"
                            blurOnSubmit
                            onSubmitEditing={stopRecognizing}
                        />

                        <TouchableOpacity
                            style={[styles.voiceButton, isDictating && styles.dictatingButton]}
                            onPress={isDictating ? stopRecognizing : startRecognizing}
                        >
                            <Ionicons name={isDictating ? "mic-off" : "mic"} size={24} color="white" />
                            <Text style={{ color: "white", marginLeft: 8 }}>
                                {isDictating ? "Detener" : "Dictar"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.nextButton} onPress={handleLogin}>
                            <Ionicons name="arrow-forward" size={24} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.registerLink}
                            onPress={() => router.push("/(tabs)/registro")}
                        >
                            <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#EEF3FF" },
    keyboardAvoid: { flex: 1 },
    scrollContainer: { flexGrow: 1, alignItems: "center", paddingTop: 120, paddingBottom: 30 },
    content: { width: 327, alignItems: "flex-start", justifyContent: "center" },
    contentWithKeyboard: { paddingTop: 10 },
    profileContainer: { alignSelf: "center", marginBottom: 20 },
    headerSection: { width: "100%", marginBottom: 15 },
    speakerButton: {
        backgroundColor: "#1E6ADB",
        width: 52,
        height: 30,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    welcomeText: { fontSize: 24, fontWeight: "bold", marginBottom: 15, color: "#000" },
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
        marginBottom: 15,
    },
    dictatingButton: { backgroundColor: "#FF5252" },
    nextButton: {
        width: "100%",
        height: 48,
        backgroundColor: "#28C940",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    registerLink: { alignSelf: "center", marginTop: 20 },
    link: { color: "#007AFF", textDecorationLine: "underline", textAlign: "center" },
    backButton: { position: "absolute", top: 50, left: 20, zIndex: 2 },
});
