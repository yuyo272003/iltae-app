import React, { useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { playAudioGlobal } from '@/utils/AudioManager';

const ProfileScreen = () => {

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.backButton} onPress={() =>
                // @ts-ignore
                router.push('/(tabs)/')}>
                <Ionicons name="arrow-back" size={28} color="blue" />
            </TouchableOpacity>

            {/* Perfiles */}
            <View style={styles.profileContainer}>
                {/* Perfil existente */}
                <TouchableOpacity
                    style={styles.profileButton}
                    onPress={async () => {
                        await playAudioGlobal(require('@/assets/audio/niveles.wav'));
                        setTimeout(() => {
                            router.push("/(tabs)/niveles");
                        }, 500);
                    }}
                >
                    <Ionicons name="person-outline" size={40} color="white" />
                    <View style={styles.editIcon}>
                        <Ionicons name="pencil" size={14} color="#006FFD" />
                    </View>
                </TouchableOpacity>

                {/* Agregar perfil */}
                <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="add" size={40} color="#006FFD" />
                </TouchableOpacity>
            </View>

            {/* Botón de reproducción */}
            <TouchableOpacity
                style={styles.playButton}
                onPress={async () => {
                    await playAudioGlobal(require('@/assets/audio/Todos.wav'));
                }}
            >
                <Ionicons name="play" size={20} color="white" />
            </TouchableOpacity>

            {/* Barra inferior */}
            <View style={styles.bottomBar} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 100,
    },
    profileButton: {
        backgroundColor: "#006FFD",
        width: 120,
        height: 120,
        borderRadius: 90,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 20,
        position: "relative",
    },
    editIcon: {
        position: "absolute",
        bottom: 5,
        right: 5,
        backgroundColor: "white",
        borderRadius: 12,
        padding: 4,
    },
    addButton: {
        width: 120,
        height: 120,
        borderRadius: 90,
        borderWidth: 2,
        borderColor: "#006FFD",
        alignItems: "center",
        justifyContent: "center",
    },
    playButton: {
        backgroundColor: "#006FFD",
        paddingVertical: 12,
        borderRadius: 5,
        width: 347,
        alignItems: "center",
        marginBottom: 50,
    },
    bottomBar: {
        width: 100,
        height: 5,
        backgroundColor: "navy",
        borderRadius: 5,
        position: "absolute",
        bottom: 20,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 2,
    },
});

export default ProfileScreen;