import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Keyboard } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  playAudioGlobal,
  stopAudioGlobal,
  isAudioPlayingGlobal,
  registerStatusCallback,
  unregisterStatusCallback,
} from "@/utils/AudioManager";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const WelcomeScreen = () => {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const cb = (playingStatus: boolean) => setIsPlaying(playingStatus);
    registerStatusCallback(cb);
    setIsPlaying(isAudioPlayingGlobal());
    return () => {
      stopAudioGlobal();
      unregisterStatusCallback(cb);
    };
  }, []);

  const handlePlayPause = () => {
    playAudioGlobal(require("../../assets/audio/bienvenida.wav"));
  };

  const handleNavigation = (route: string) => {
    stopAudioGlobal();
    router.push(route as any);
  };

  return (
      <LinearGradient
          colors={["#007AFF", "#0056B3", "#162F5E"]}
          locations={[0.17, 0.41, 0.83]}
          style={styles.container}
      >
        <Image
            source={require("../../assets/images/logo_iltae.png")}
            style={styles.logo}
            resizeMode="contain"
        />

        <TouchableOpacity style={styles.buttonPlay} onPress={handlePlayPause}>
          <Feather
              name={isPlaying ? "pause" : "play"}
              size={28}
              color="#007AFF"
          />
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.buttonGreen}
            onPress={() => handleNavigation("/(tabs)/registro")}
        >
          <MaterialIcons name="arrow-forward" size={24} color="green" />
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.buttonBlue}
            onPress={() => handleNavigation("/(tabs)/login")}
        >
          <Ionicons name="log-in-outline" size={24} color="#007AFF" />
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
    backgroundColor: "white",
    borderColor: "green",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 20,
  },
  buttonBlue: {
    width: 327,
    height: 48,
    backgroundColor: "white",
    borderColor: "#007AFF",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
});

export default WelcomeScreen;
