import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            {/* Perfiles */}
            <View style={styles.profileContainer}>
                {/* Perfil existente */}
                <TouchableOpacity style={styles.profileButton}>
                    <Ionicons name="person-outline" size={40} color="white" />
                    <View style={styles.editIcon}>
                        <Ionicons name="pencil" size={14} color="006FFD" />
                    </View>
                </TouchableOpacity>

                {/* Agregar perfil */}
                <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="add" size={40} color="blue" />
                </TouchableOpacity>
            </View>

            {/* Botón de reproducción */}
            <TouchableOpacity style={styles.playButton}>
                <Ionicons name="play" size={20} color="white" />
            </TouchableOpacity>


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
        backgroundColor: "blue",
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
        borderColor: "blue",
        alignItems: "center",
        justifyContent: "center",
    },
    playButton: {
        backgroundColor: "blue",
        paddingVertical: 12,
        borderRadius: 5,
        width: 327,
        alignItems: "center",
        marginBottom: 50,
    },

});

export default ProfileScreen;
