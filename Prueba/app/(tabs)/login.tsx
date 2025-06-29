import React, { useEffect, useState, useRef, useCallback } from "react";
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

export default function LoginScreen() {
    const [nombre, setNombre] = useState<string>("");
    const { setUser } = useAuth();
    const [isDictating, setIsDictating] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(isAudioPlayingGlobal());
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const inputRef = useRef<TextInput>(null);

    // Pausar audio cuando pierda foco
    useFocusEffect(useCallback(() => () => stopAudioGlobal(), []));

    // AudioManager callbacks
    useEffect(() => {
        const statusCb = (playing: boolean) => setIsAudioPlaying(playing);
        registerStatusCallback(statusCb);
        return () => {
            unregisterStatusCallback(statusCb);
            stopAudioGlobal();
        };
    }, []);

    // Keyboard listeners
    useEffect(() => {
        const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
        const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    // Voice listeners
    useEffect(() => {
        Voice.onSpeechStart = () => {
            console.log("🎤 onSpeechStart");
            setIsDictating(true);
        };
        Voice.onSpeechPartialResults = (e) => {
            console.log("⏳ onSpeechPartialResults:", e.value);
            e.value?.[0] && setNombre(e.value[0]);
        };
        Voice.onSpeechResults = (e) => {
            console.log("✔️ onSpeechResults:", e.value);
            e.value?.[0] && setNombre(e.value[0]);
            setIsDictating(false);
        };
        Voice.onSpeechError = (e) => {
            console.warn("❌ onSpeechError:", e.error);
            setIsDictating(false);
        };
        return () => {
            Voice.destroy().then(() => Voice.removeAllListeners());
        };
    }, []);

    // Permiso en Android
    const requestAudioPermission = async (): Promise<boolean> => {
        if (Platform.OS !== "android") return true;
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
    };

    const startRecognizing = async () => {
        const ok = await requestAudioPermission();
        if (!ok) {
            Alert.alert("Permiso denegado", "No podemos usar el micrófono sin permiso.");
            return;
        }
        try {
            console.log("📲 Starting Community Voice Recognition");
            await Voice.start("es-MX", { REQUEST_PERMISSIONS_AUTO: true });
        } catch (e) {
            console.error("Voice.start error:", e);
            setIsDictating(false);
        }
    };

    const stopRecognizing = async () => {
        try {
            console.log("🛑 Stopping Voice Recognition");
            await Voice.stop();
        } catch (e) {
            console.error("stopRecognizing error:", e);
        } finally {
            setIsDictating(false);
            Keyboard.dismiss();
        }
    };

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
            // 1) Llama al wrapper con la string, no con un objeto
            const { user, token, niveles_completados } = await api.login(nombre);

            // 2) Como api.login ya guardó el token, no necesitas setearlo de nuevo
            //    Pero si quieres hacerlo aquí, OK:
            await AsyncStorage.setItem("auth_token", token);

            // 3) Actualiza tu contexto/estado
            setUser({ ...user, niveles_completados });

            // 4) Navega
            router.push("/(tabs)/perfiles");
        } catch (error: any) {
            Alert.alert(
                "Error",
                error.response?.data?.message || "No se pudo iniciar sesión 😢"
            );
        }
    };


    // Función extraída para el TextInput
    const renderInput = () => (
        <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Ingresa tu nombre"
            placeholderTextColor="#999"
            value={nombre}
            onChangeText={setNombre}       // ← esencial para poder editar
            editable={!isDictating}        // desactiva edición mientras dicta
        />
    );

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
                            <TouchableOpacity
                                style={styles.speakerButton}
                                onPress={reproducirInstrucciones}
                            >
                                <Ionicons
                                    name={isAudioPlaying ? "pause" : "volume-high"}
                                    size={20}
                                    color="white"
                                />
                            </TouchableOpacity>
                            <Text style={styles.welcomeText}>¡Iniciar Sesión!</Text>
                        </View>

                        {renderInput()}

                        <TouchableOpacity
                            style={[styles.voiceButton, isDictating && styles.dictatingButton]}
                            onPress={isDictating ? stopRecognizing : startRecognizing}
                        >
                            <Ionicons
                                name={isDictating ? "mic-off" : "mic"}
                                size={24}
                                color="white"
                            />
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
    scrollContainer: {
        flexGrow: 1,
        alignItems: "center",
        paddingTop: 120,
        paddingBottom: 30,
    },
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