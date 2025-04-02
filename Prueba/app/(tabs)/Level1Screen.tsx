import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const lessons = [
    {
        id: 'intro',
        title: 'Introducción',
        type: 'intro',
        image: require('@assets/images/lecciones/nivel1/vocales.png'),
        audioFile: require('@assets/audio/lecciones/nivel1/introduccion.wav'),
    },
    {
        id: 'leccion1',
        title: 'Introducción a las vocales',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel1/introduccion.png'),
        audioFile: require('@assets/audio/lecciones/nivel1/leccion1.wav'),
    },
    {
        id: 'leccion2',
        title: 'Consonantes nasales',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel1/consonantes_basicas.png'),
        audioFile: require('@assets/audio/lecciones/nivel1/leccion2.wav'),
    },
    {
        id: 'leccion3',
        title: 'Consonantes explosivas',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel1/consonantes_medias.png'),
        audioFile: require('@assets/audio/lecciones/nivel1/leccion3.wav'),
    },
    {
        id: 'leccion4',
        title: 'Consonantes de aire',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel1/consonantes_complejas.png'),
        audioFile: require('@assets/audio/lecciones/nivel1/leccion4.wav'),
    },
    {
        id: 'leccion5',
        title: 'Consonantes linguales',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel1/consonantes_linguales.png'),
        audioFile: require('@assets/audio/lecciones/nivel1/leccion5.wav'),
    },
    {
        id: 'leccion6',
        title: 'Consonantes especiales',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel1/consonantes_especiales.png'),
        audioFile: require('@assets/audio/lecciones/nivel1/leccion6.wav'),
    },

];

export default function Level1Screen() {
    const router = useRouter();

    const playSound = async (audioFile: any) => {
        const { sound } = await Audio.Sound.createAsync(audioFile);
        await sound.playAsync();
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Encabezado */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push("/(tabs)/niveles")}>
                    <Ionicons name="arrow-back" size={28} color="#3E64FF" />
                </TouchableOpacity>

                <View style={styles.titleRow}>
                    <Text style={styles.title}>Nivel 1</Text>
                    <TouchableOpacity
                        onPress={() => playSound(require('@assets/audio/lecciones/nivel1/intro.wav'))}
                        style={styles.audioPill}
                    >
                        <Ionicons name="volume-high" size={14} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={{ width: 28 }} /> {/* Espacio para alinear */}
            </View>

            <FlatList
                data={lessons}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => {
                            console.log(`Ir a la lección ${item.id}`);
                        }}
                    >
                        <Image source={item.image} style={styles.image} resizeMode="contain" />
                        {item.type === 'intro' ? (
                            <>
                                <Text style={styles.subtitle}>{item.title}</Text>
                                <TouchableOpacity
                                    onPress={(e) => {
                                        e.stopPropagation();
                                        playSound(item.audioFile);
                                    }}
                                    style={styles.playBar}
                                >
                                    <Ionicons name="play" size={16} color="#fff" />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <View style={styles.row}>
                                <Text style={styles.subtitle}>{item.title}</Text>
                                <TouchableOpacity
                                    onPress={(e) => {
                                        e.stopPropagation();
                                        playSound(item.audioFile);
                                    }}
                                    style={styles.audioPill}
                                >
                                    <Ionicons name="volume-high" size={14} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        )}
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.grid}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    grid: {
        gap: 16,
        paddingHorizontal: 16,
    },
    card: {
        flex: 1,
        margin: 8,
        borderRadius: 16,
        backgroundColor: '#F7F8FF',
        padding: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 90,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '600',
        flexShrink: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    playBar: {
        marginTop: 8,
        backgroundColor: '#3E64FF',
        borderRadius: 25,
        paddingVertical: 10,
        alignItems: 'center',
        width: '100%',
    },
    audioPill: {
        backgroundColor: '#3E64FF',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
