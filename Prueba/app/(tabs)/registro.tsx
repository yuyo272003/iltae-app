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
    Platform,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/contexts/AuthContext";
import api from '@/scripts/api';
import { Audio, AVPlaybackSource } from 'expo-av';
import {
    playAudioGlobal,
    stopAudioGlobal,
    registerStatusCallback,
    unregisterStatusCallback,
    isAudioPlayingGlobal,
} from '@/utils/AudioManager';

export default function RegistroScreen() {
    const [nombre, setNombre] = useState("");
    const { setUser } = useAuth();
    const [isDictating, setIsDictating] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(isAudioPlayingGlobal());
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [dictationAudio, setDictationAudio] = useState<Audio.Sound | null>(null);
    const inputRef = useRef<TextInput>(null);

    // Pause audios when screen loses focus
    useFocusEffect(
        useCallback(() => {
            return () => {
                stopAudioGlobal();
                if (dictationAudio) {
                    dictationAudio.stopAsync();
                    dictationAudio.unloadAsync();
                    setDictationAudio(null);
                }
            };
        }, [dictationAudio])
    );

    // AudioManager (speaker) callbacks
    useEffect(() => {
        const statusCb = (playing: boolean) => setIsAudioPlaying(playing);
        registerStatusCallback(statusCb);
        return () => {
            unregisterStatusCallback(statusCb);
            stopAudioGlobal();
            if (dictationAudio) {
                dictationAudio.unloadAsync();
            }
        };
    }, [dictationAudio]);

    // Keyboard listeners
    useEffect(() => {
        const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
        return () => {
            show.remove();
            hide.remove();
        };
    }, []);

    // Local playback for dictation instructions (decoupled)
    const reproducirAudioLocal = async (audioFile: AVPlaybackSource) => {
        try {
            if (dictationAudio) {
                await dictationAudio.stopAsync();
                await dictationAudio.unloadAsync();
            }
            const { sound } = await Audio.Sound.createAsync(audioFile);
            setDictationAudio(sound);
            await sound.playAsync();
            sound.setOnPlaybackStatusUpdate(status => {
                if (status.isLoaded && status.didJustFinish) {
                    sound.unloadAsync();
                    setDictationAudio(null);
                }
            });
        } catch (error) {
            console.log('Error reproducirAudioLocal:', error);
        }
    };

    // Play screen instructions via AudioManager
    const reproducirInstrucciones = () => {
        playAudioGlobal(require('@/assets/audio/registro_instrucciones.wav'));
    };

    // Play dictation instructions via local audio
    const reproducirInstruccionesDictado = () => {
        reproducirAudioLocal(require('@/assets/audio/dictado_instrucciones.wav'));
    };

    const activateDictation = () => {
        setIsDictating(true);
        if (inputRef.current) inputRef.current.focus();
        setTimeout(reproducirInstruccionesDictado, 500);
    };

    const deactivateDictation = async () => {
        setIsDictating(false);
        Keyboard.dismiss();
        if (dictationAudio) {
            await dictationAudio.stopAsync();
            await dictationAudio.unloadAsync();
            setDictationAudio(null);
        }
    };

    const handleRegister = async () => {
        if (!nombre.trim()) {
            Alert.alert("Error", "Por favor ingresa tu nombre.");
            return;
        }
        try {
            const response = await api.post('/register', { name: nombre });
            const { token, user } = response.data;
            await AsyncStorage.setItem("auth_token", token);
            setUser(user);
            //Alert.alert("¡Registro exitoso!");
            router.push("/(tabs)/perfiles");
        } catch (error: any) {
            Alert.alert(
                "Error",
                error.response?.data?.message || "Algo salió mal 😢"
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
                    <View
                        style={[styles.content, keyboardVisible && styles.contentWithKeyboard]}
                    >
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

                            <Text style={styles.welcomeText}>¡Bienvenido!</Text>
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
                            onSubmitEditing={deactivateDictation}
                        />

                        <TouchableOpacity
                            style={[styles.voiceButton, isDictating && styles.dictatingButton]}
                            onPress={isDictating ? deactivateDictation : activateDictation}
                        >
                            <Ionicons name="mic" size={24} color="white" />
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
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginBottom: 15,
        flexDirection: "row",
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
    backButton: { position: 'absolute', top: 50, left: 20, zIndex: 2 },
});
