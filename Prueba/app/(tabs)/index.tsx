import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  playAudioGlobal,
  stopAudioGlobal,
  isAudioPlayingGlobal,
  registerStatusCallback,
  unregisterStatusCallback,
} from "@/utils/AudioManager";

const WelcomeScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const statusCallback = (playingStatus: boolean) => {
      setIsPlaying(playingStatus);
    };

    registerStatusCallback(statusCallback);
    setIsPlaying(isAudioPlayingGlobal());

    return () => {
      stopAudioGlobal();
      unregisterStatusCallback(statusCallback);
    };
  }, []);
  const handlePlayPause = async () => {
    await playAudioGlobal(require("../../assets/audio/bienvenida.wav"));
  };

  const handleNavigation = async (route: string) => {
    await stopAudioGlobal();
    router.push(route as any);
  };

  return (
    <LinearGradient
      colors={["#007AFF", "#0056B3", "#162F5E"]}
      locations={[0.17, 0.41, 0.83]}
      style={styles.container}
    >
      {/* Logo */}
      <Image
        source={require("../../assets/images/logo_iltae.png")} // Asegúrate que exista este archivo
        style={styles.logo}
        resizeMode="contain"
      />
      {/* <Text style={styles.title}>ILTAE</Text> */}

      {/* Botón reproducir/pausar */}
      <TouchableOpacity style={styles.buttonPlay} onPress={handlePlayPause}>
        <Feather name={isPlaying ? "pause" : "play"} size={28} color="#007AFF" />
      </TouchableOpacity>

      {/* Botón para registro */}
      <TouchableOpacity
        style={styles.buttonGreen}
        onPress={() => handleNavigation("/(tabs)/registro")}
      >
        <MaterialIcons name="arrow-forward" size={24} color="green" />
      </TouchableOpacity>

      {/* Link inferior */}
      <TouchableOpacity onPress={() => handleNavigation("/(tabs)/login")}>
        <Text style={styles.link}>¿Y si sé leer y escribir?</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },  
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 40,
  },
  buttonPlay: {
    width: 327,
    height: 48,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 20,
  },
  buttonGreen: {
    width: 327,
    height: 48,
    backgroundColor: "#fff",
    borderColor: "green",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 20,
  },
  link: {
    color: "#D1D1D1",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});

export default WelcomeScreen;
