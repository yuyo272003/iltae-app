import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Audio, AVPlaybackSource } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import {
  playAudioGlobal,
  stopAudioGlobal,
  registerStatusCallback,
  unregisterStatusCallback,
  isAudioPlayingGlobal,
} from '@/utils/AudioManager';

type ImageItem = {
  id: string;
  src: any;
  audio: AVPlaybackSource;
  isCorrect: boolean;
};

type OddOneOutGameProps = {
  title: string;
  titleAudio: AVPlaybackSource;
  images: ImageItem[];
  practiceAudio: AVPlaybackSource;
  onNext?: () => void;
  onTopBack?: () => void;
  onBottomBack?: () => void;
};

export default function PracticeImageAudioScreen({
                                                   title,
                                                   titleAudio,
                                                   images,
                                                   practiceAudio,
                                                   onNext,
                                                   onTopBack,
                                                   onBottomBack,
                                                 }: OddOneOutGameProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [result, setResult] = useState<'correct'|'incorrect'|null>(null);
  const [currentImageSound, setCurrentImageSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(isAudioPlayingGlobal());

  // AudioManager callbacks
  useEffect(() => {
    const statusCb = (playing: boolean) => setIsPlaying(playing);
    registerStatusCallback(statusCb);
    setIsPlaying(isAudioPlayingGlobal());
    return () => {
      stopAudioGlobal();
      unregisterStatusCallback(statusCb);
      if (currentImageSound) {
        currentImageSound.unloadAsync();
      }
    };
  }, [currentImageSound]);

  const handleSelect = (item: ImageItem) => {
    // stop any audio
    stopAudioGlobal();
    if (currentImageSound) {
      currentImageSound.stopAsync();
      currentImageSound.unloadAsync();
      setCurrentImageSound(null);
    }
    setSelectedId(item.id);
    setResult(item.isCorrect ? 'correct' : 'incorrect');
  };

  const getBorderColor = (itemId: string) => {
    if (itemId === selectedId) {
      return result === 'correct' ? '#4CAF50' : '#F44336';
    }
    return '#FFFFFF';
  };

  const playImageSound = async (file: AVPlaybackSource) => {
    // stop practice audio
    stopAudioGlobal();
    if (currentImageSound) {
      await currentImageSound.stopAsync();
      await currentImageSound.unloadAsync();
      setCurrentImageSound(null);
    }
    const { sound } = await Audio.Sound.createAsync(file);
    setCurrentImageSound(sound);
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate(status => {
      if (status.isLoaded && status.didJustFinish) {
        sound.unloadAsync();
        setCurrentImageSound(null);
      }
    });
  };

  const togglePracticeAudio = () => {
    // stop image sound
    if (currentImageSound) {
      currentImageSound.stopAsync();
      currentImageSound.unloadAsync();
      setCurrentImageSound(null);
    }
    playAudioGlobal(practiceAudio);
  };

  const restartPracticeAudio = () => {
    // stop image & practice
    if (currentImageSound) {
      currentImageSound.stopAsync();
      currentImageSound.unloadAsync();
      setCurrentImageSound(null);
    }
    stopAudioGlobal();
    playAudioGlobal(practiceAudio);
  };

  const handleNav = (fn?: () => void) => {
    stopAudioGlobal();
    if (currentImageSound) {
      currentImageSound.stopAsync();
      currentImageSound.unloadAsync();
      setCurrentImageSound(null);
    }
    fn?.();
  };

  const showBottomBack = pathname !== '/niveles/nivel2/leccion1/Bpractice';

  return (
      <View style={styles.container}>
        {/* Top Back */}
        <TouchableOpacity style={styles.topBackButton} onPress={() => handleNav(onTopBack)}>
          <Ionicons name="arrow-back" size={32} color="#2b2b2b" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Grid */}
        <FlatList
            data={images}
            numColumns={2}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.grid}
            renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <TouchableOpacity
                      onPress={() => handleSelect(item)}
                      style={[styles.imageWrapper, { borderColor: getBorderColor(item.id) }]}
                  >
                    <Image source={item.src} style={styles.image} resizeMode="contain" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.audioButton} onPress={() => playImageSound(item.audio)}>
                    <Ionicons name="volume-high" size={24} color="white" />
                  </TouchableOpacity>
                </View>
            )}
        />

        {/* Bottom Panel */}
        <View style={styles.bottomPanel}>
          <TouchableOpacity style={styles.playButton} onPress={togglePracticeAudio}>
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, isPlaying ? { width: '50%' } : { width: 0 }]} />
          </View>

          <TouchableOpacity style={styles.restartButton} onPress={restartPracticeAudio}>
            <Ionicons name="refresh" size={24} color="white" />
          </TouchableOpacity>

          {showBottomBack && (
              <TouchableOpacity style={styles.backButton} onPress={() => handleNav(onBottomBack)}>
                <Ionicons name="arrow-back" size={24} color="red" />
              </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.nextButton} onPress={() => handleNav(onNext)}>
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1D2233', alignItems: 'center', paddingTop: 50 },
  topBackButton: { position: 'absolute', top: 40, left: 20, backgroundColor: '#e0e0e0', padding: 14, borderRadius: 50, elevation: 5, zIndex: 10 },
  title: { fontSize: 48, color: 'white', fontWeight: 'bold', marginBottom: 20 },
  grid: { alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  itemContainer: { alignItems: 'center', margin: 10 },
  imageWrapper: { width: 100, height: 100, borderWidth: 4, borderRadius: 20, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' },
  image: { width: 70, height: 70 },
  audioButton: { marginTop: 5, width: 40, height: 40, borderRadius: 20, backgroundColor: '#1D2233', alignItems: 'center', justifyContent: 'center', elevation: 4 },
  bottomPanel: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 200, backgroundColor: '#2b2b2b', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, alignItems: 'center', elevation: 10 },
  playButton: { backgroundColor: '#2e6ef7', padding: 14, borderRadius: 12, width: '90%', alignItems: 'center', marginBottom: 12 },
  progressBarContainer: { height: 6, backgroundColor: '#ccc', width: '90%', borderRadius: 3, marginBottom: 12 },
  progressBarFill: { height: '100%', backgroundColor: '#2e6ef7', borderRadius: 3 },
  restartButton: { position: 'absolute', bottom: 30, backgroundColor: '#2e6ef7', borderRadius: 50, padding: 15, alignSelf: 'center' },
  nextButton: { position: 'absolute', right: 30, bottom: 30, backgroundColor: '#33cc66', borderRadius: 50, padding: 15 },
  backButton: { position: 'absolute', left: 30, bottom: 30, backgroundColor: '#ffffff', borderRadius: 50, padding: 15 },
});
