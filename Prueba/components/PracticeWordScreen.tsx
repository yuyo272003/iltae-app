import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Audio, AVPlaybackSource } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { usePathname } from 'expo-router';

type ImageItem = {
  id: string;
  src: any;
  audio: AVPlaybackSource;
  isCorrect: boolean;
};

type OddOneOutGameProps = {
  title: string;
  titleAudio: any,
  images: ImageItem[];
  practiceAudio: AVPlaybackSource;
  onNext?: () => void;
  onTopBack?: () => void;
  onBottomBack?: () => void;
  onCorrect?:() => void;
  onIncorrect?:() => void;
};

const PracticeImageAudioScreen: React.FC<OddOneOutGameProps> = ({
  title,
  titleAudio,
  images,
  practiceAudio,
  onNext,
  onTopBack,
  onBottomBack,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const [practiceSound, setPracticeSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const pathname = usePathname(); //obtengo la ruta actual 

  const handleSelect = (item: ImageItem) => {
    setSelectedId(item.id);
    if (item.isCorrect) {
      setResult('correct');
    } else {
      setResult('incorrect');
    }
  };

  const getBorderColor = (itemId: string) => {
    if (itemId === selectedId) {
      return result === 'correct' ? '#4CAF50' : '#F44336'; 
    }
    return '#FFFFFF';
  };

  const playImageSound = async (file: AVPlaybackSource) => {
    const { sound } = await Audio.Sound.createAsync(file);
    await sound.playAsync();
  };

  const togglePracticeAudio = async () => {
    if (practiceSound && isPlaying) {
      await practiceSound.pauseAsync();
      setIsPlaying(false);
      setIsPaused(true);
    } else if (practiceSound && isPaused) {
      await practiceSound.playAsync();
      setIsPlaying(true);
      setIsPaused(false);
    } else {
      const { sound } = await Audio.Sound.createAsync(practiceAudio);
      setPracticeSound(sound);
      await sound.playAsync();
      setIsPlaying(true);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
          setIsPaused(false);
        }
      });
    }
  };

  const restartPracticeAudio = async () => {
    if (practiceSound) {
      await practiceSound.stopAsync();
      await practiceSound.setPositionAsync(0);
      await practiceSound.playAsync();
      setIsPlaying(true);
      setIsPaused(false);
    }
  };

  const stopAudioAndNavigate = async (navigationFn?: () => void) => {
    if (practiceSound) {
      await practiceSound.stopAsync();
      await practiceSound.unloadAsync();
      setPracticeSound(null);
    }
    setIsPlaying(false);
    setIsPaused(false);
    navigationFn?.();
  };

  // Condicional para ocultar el bottomback en la primer pantalla de la lección 1
  const showBottomBackButton = pathname !== '/niveles/nivel2/leccion1/Bpractice';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.topBackButton}
        onPress={() => stopAudioAndNavigate(onTopBack)}
      >
        <Ionicons name="arrow-back" size={32} color="#2b2b2b" />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <FlatList
        data={images}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              style={[
                styles.imageWrapper,
                { backgroundColor: getBorderColor(item.id) },
              ]}
            >
              <Image source={item.src} style={styles.image} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.audioButton} onPress={() => playImageSound(item.audio)}>
              <Ionicons name="volume-high" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.bottomPanel}>
        <TouchableOpacity style={styles.playButton} onPress={togglePracticeAudio}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarFill} />
        </View>

        <TouchableOpacity style={styles.restartButton} onPress={restartPracticeAudio}>
          <Ionicons name="refresh" size={24} color="white" />
        </TouchableOpacity>

        {/* Aquí es donde se controla el mostrar el bottomback o no */}
        {showBottomBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={() => stopAudioAndNavigate(onBottomBack)}>
            <Ionicons name="arrow-back" size={24} color="red" />
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.nextButton} onPress={() => stopAudioAndNavigate(onNext)}>
          <Ionicons name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PracticeImageAudioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D2233',
    alignItems: 'center',
    paddingTop: 50,
  },
  topBackButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#e0e0e0',
    padding: 14,
    borderRadius: 50,
    elevation: 5,
    zIndex: 10,
  },
  title: {
    fontSize: 48,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grid: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  itemContainer: {
    alignItems: 'center',
    margin: 10,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 70,
    height: 70,
  },
  audioButton: {
    marginTop: 5,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1D2233',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: '#2b2b2b',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    alignItems: 'center',
    elevation: 10,
  },
  playButton: {
    backgroundColor: '#2e6ef7',
    padding: 14,
    borderRadius: 12,
    width: '90%',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#ccc',
    width: '90%',
    borderRadius: 3,
    marginBottom: 12,
  },
  progressBarFill: {
    width: '50%',
    height: '100%',
    backgroundColor: '#2e6ef7',
    borderRadius: 3,
  },
  restartButton: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: '#2e6ef7',
    borderRadius: 50,
    padding: 15,
    alignSelf: 'center',
  },
  nextButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: '#33cc66',
    borderRadius: 50,
    padding: 15,
  },
  backButton: {
    position: 'absolute',
    left: 30,
    bottom: 30,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    padding: 15,
  },
});
