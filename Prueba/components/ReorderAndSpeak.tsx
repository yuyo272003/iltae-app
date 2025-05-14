import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Voice from '@react-native-community/voice';
import { Ionicons } from '@expo/vector-icons';
import { Audio, AVPlaybackSource } from 'expo-av';

type Props = {
  correctPhrase: string; // Frase esperada como texto (e.g., "El globo rojo es")
  words: string[];       // Palabras en desorden
  audioFile?: AVPlaybackSource; // Audio opcional con la frase
  onSuccess?: () => void; // Acción opcional cuando se diga bien la frase
};

const SpeechPhraseScreen: React.FC<Props> = ({ correctPhrase, words, audioFile, onSuccess }) => {
  const [recognizedText, setRecognizedText] = useState('');
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      if (sound) sound.unloadAsync();
    };
  }, []);

  const onSpeechResults = (event: any) => {
    const text = event.value[0];
    setRecognizedText(text);
    if (text.trim().toLowerCase() === correctPhrase.trim().toLowerCase()) {
      Alert.alert('✅ ¡Correcto!', `"${text}"`);
      onSuccess?.();
    } else {
      Alert.alert('❌ Intenta de nuevo', `Dijiste: "${text}"`);
    }
  };

  const startListening = async () => {
    setRecognizedText('');
    try {
      await Voice.start('es-MX');
    } catch (e) {
      console.error('Error iniciando Voice:', e);
    }
  };

  const playAudio = async () => {
    if (!audioFile) return;
    const { sound } = await Audio.Sound.createAsync(audioFile);
    setSound(sound);
    await sound.playAsync();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>C...</Text>
      <View style={styles.wordsWrapper}>
        {words.map((word, idx) => (
          <View key={idx} style={styles.wordBox}>
            <Text style={styles.wordText}>{word}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity onPress={startListening} style={styles.micButton}>
        <Ionicons name="mic" size={24} color="#2e6ef7" />
      </TouchableOpacity>

      <TouchableOpacity onPress={playAudio} style={styles.playButton}>
        <Ionicons name="play" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextButton}>
        <Ionicons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#1c2230', 
    padding: 20 
    },
    title: {
        color: 'white', 
        fontSize: 20, 
        marginBottom: 10 
    },
    wordsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20
  },
  wordBox: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    margin: 5,
  },
  wordText: { fontSize: 16, color: '#000' },
  micButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
 playButton: {
        backgroundColor: '#2e6ef7',
        padding: 16,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        marginBottom: 16,
    },
  nextButton: {
    backgroundColor: '#00c853',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default SpeechPhraseScreen;
