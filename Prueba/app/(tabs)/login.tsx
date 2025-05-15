// LoginScreen.tsx
import React, { useState, useEffect, useCallback, useRef } from "react";
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
    PermissionsAndroid,
    Platform,
    NativeModules,
    NativeEventEmitter,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/scripts/api";
import {
    playAudioGlobal,
    stopAudioGlobal,
    registerStatusCallback,
    unregisterStatusCallback,
    isAudioPlayingGlobal,
} from "@/utils/AudioManager";
import Voice from "@react-native-community/voice";

const voiceEmitter =
    Platform.OS !== "web" ? new NativeEventEmitter(NativeModules.Voice) : null;

interface SpeechOptions {
    onResult: (spoken: string) => void;
    onError?: () => void;
}

function useSpeechRecognition({ onResult, onError }: SpeechOptions) {
    const [isRecording, setIsRecording] = useState(false);

    const requestAudioPermission = useCallback(async (): Promise<boolean> => {
        if (Platform.OS !== "android") return true;
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: "Permiso de micrófono",
                message: "La app necesita acceder al micrófono.",
                buttonNegative: "Cancelar",
                buttonPositive: "Aceptar",
            }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    }, []);

    const start = useCallback(async () => {
        if (Platform.OS === "web") {
            Alert.alert("No soportado", "Dictación de voz no funciona en web.");
            return;
        }
        if (!(await requestAudioPermission())) {
            onError?.();
            return;
        }
        try {
            await Voice.cancel();
            const extras: Record<string, any> = {};
            if (Platform.OS === "android") {
                extras["android.speech.extra.SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS"] = 5000;
                extras["android.speech.extra.SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS"] = 5000;
                extras["android.speech.extra.SPEECH_INPUT_MINIMUM_LENGTH_MILLIS"] = 10000;
            }
            await Voice.start("es-MX", extras);
            setIsRecording(true);
        } catch (e) {
            console.error("Voice.start error", e);
            setIsRecording(false);
            onError?.();
        }
    }, [requestAudioPermission, onError]);

    const stop = useCallback(async () => {
        if (Platform.OS === "web") return;
        try {
            await Voice.stop();
            await Voice.cancel();
        } catch (e) {
            console.error("Voice.stop error", e);
        } finally {
            setIsRecording(false);
            // no dismiss here so the keyboard stays up
        }
    }, []);

    const onSpeechStart = useCallback(() => {
        if (Platform.OS !== "web") setIsRecording(true);
    }, []);

    const onSpeechResults = useCallback(
        ({ value }: any) => {
            const spoken = value?.[0] ?? "";
            onResult(spoken);
            stop();
        },
        [onResult, stop]
    );

    const onSpeechErrorEvt = useCallback(() => {
        console.warn("Speech recognition error");
        stop();
    }, [stop]);

    useEffect(() => {
        if (Platform.OS === "web" || !voiceEmitter) return;
        const subs = [
            voiceEmitter.addListener("onSpeechStart", onSpeechStart),
            voiceEmitter.addListener("onSpeechResults", onSpeechResults),
            voiceEmitter.addListener("onSpeechError", onSpeechErrorEvt),
        ];
        return () => subs.forEach((s) => s.remove());
    }, [onSpeechStart, onSpeechResults, onSpeechErrorEvt]);

    useFocusEffect(
        useCallback(() => {
            return () => stop();
        }, [stop])
    );

    return { isRecording, start, stop };
}

export default function LoginScreen() {
    const [nombre, setNombre] = useState("");
    const { setUser } = useAuth();
    const [isAudioPlaying, setIsAudioPlaying] = useState(isAudioPlayingGlobal());
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const inputRef = useRef<TextInput>(null);

    // AudioManager
    useEffect(() => {
        const cb = (playing: boolean) => setIsAudioPlaying(playing);
        registerStatusCallback(cb);
        return () => {
            unregisterStatusCallback(cb);
            stopAudioGlobal();
        };
    }, []);

    // Keyboard
    useEffect(() => {
        const show = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
        const hide = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
        return () => {
            show.remove();
            hide.remove();
        };
    }, []);

    const { isRecording, start, stop } = useSpeechRecognition({
        onResult: (spoken) => {
            setNombre(spoken);
            inputRef.current?.focus();
        },
        onError: () => Alert.alert("Error", "No se pudo reconocer la voz"),
    });

    const reproducirInstrucciones = () => {
        playAudioGlobal(require("@/assets/audio/registro_instrucciones.wav"));
    };

    const handleLogin = async () => {
        if (!nombre.trim()) {
            Alert.alert("Error", "Por favor ingresa tu nombre.");
            return;
        }
        try {
            const { data } = await api.post("/login", { name: nombre });
            await AsyncStorage.setItem("auth_token", data.token);
            setUser({ ...data.user, niveles_completados: data.niveles_completados });
            router.push("/(tabs)/perfiles");
        } catch (e: any) {
            Alert.alert("Error", e.response?.data?.message || "No se pudo iniciar sesión 😢");
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
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={[styles.content, keyboardVisible && styles.contentWithKeyboard]}>
                        <View style={styles.profileContainer}>
                            <Ionicons name="person-circle" size={100} color="#1E6ADB" />
                        </View>

                        <View style={styles.headerSection}>
                            <TouchableOpacity style={styles.speakerButton} onPress={reproducirInstrucciones}>
                                <Ionicons name={isAudioPlaying ? "pause" : "volume-high"} size={20} color="white" />
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
                            editable={!isRecording}
                            returnKeyType="done"
                        />

                        <TouchableOpacity
                            style={[styles.voiceButton, isRecording && styles.dictatingButton]}
                            onPress={() => (isRecording ? stop() : start())}
                        >
                            <Ionicons name={isRecording ? "mic-off" : "mic"} size={24} color="white" />
                            <Text style={{ color: "white", marginLeft: 8 }}>
                                {isRecording ? "Detener" : "Dictar"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.nextButton} onPress={handleLogin}>
                            <Ionicons name="arrow-forward" size={24} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.registerLink} onPress={() => router.push("/(tabs)/registro")}>
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
