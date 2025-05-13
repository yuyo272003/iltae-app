import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { playAudioGlobal, stopAudioGlobal } from '@/utils/AudioManager';
import api from '@/scripts/api';

const lessons = [
    {
        id: 'intro',
        title: 'Introducción',
        type: 'intro',
        image: require('@assets/images/lecciones/nivel1/vocales.png'),
        audioFile: require('@assets/audio/levels/nivel2/introduccionGuia.wav'),
    },
    {
        id: 'leccion1',
        title: 'Revisión y práctica de consonantes',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel1/consonantes_basicas.png'),
        audioFile: require('@assets/audio/levels/nivel2/leccion1.wav'),
    },
    {
        id: 'leccion2',
        title: 'Consonantes y vocales',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel1/consonantes_medias.png'),
        audioFile: require('@assets/audio/levels/nivel2/leccion2.wav'),
    },
    {
        id: 'leccion3',
        title: 'Práctica de palabras',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel1/consonantes_medias.png'),
        audioFile: require('@assets/audio/levels/nivel2/leccion3.wav'),
    },
];

export default function Level2Screen() {
    const router = useRouter();
    const [leccionDesbloqueada, setLeccionDesbloqueada] = useState(1);

    // 1) Offset y conteo:
    const level1Count = 6;
    const level2Count = lessons.filter(l => l.type === 'leccion').length; // 3
    const lastLevel2GlobalId = level1Count + level2Count;                // 9

    // 2) Saber si ya terminó todo el nivel 2
    const haTerminadoNivel2 = leccionDesbloqueada > lastLevel2GlobalId;

    // Función para traer el progreso
    const fetchLeccionDesbloqueada = useCallback(async () => {
        try {
            console.log('📥 Solicitando datos de progreso a la API...');
            const response = await api.post('/progreso/get-leccion');
            const id = parseInt(response.data.leccion_id, 10);
            if (!isNaN(id)) {
                console.log('📥 Progreso actualizado:', id);
                setLeccionDesbloqueada(id);
            }
        } catch (error) {
            console.error('Error al obtener lección:', error);
        }
    }, []);

    // Efectos de montaje y foco
    useEffect(() => {
        fetchLeccionDesbloqueada();
        return () => { stopAudioGlobal(); };
    }, [fetchLeccionDesbloqueada]);

    useFocusEffect(useCallback(() => {
        fetchLeccionDesbloqueada();
    }, [fetchLeccionDesbloqueada]));

    return (
        <SafeAreaView style={styles.container}>
            {/* Encabezado */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={async () => {
                        await stopAudioGlobal();
                        router.push("/(tabs)/niveles");
                    }}
                >
                    <Ionicons name="arrow-back" size={28} color="#3E64FF" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => playAudioGlobal(require('@assets/audio/levels/nivel2/nivel2.wav'))}
                    style={styles.titlePill}
                >
                    <Ionicons name="volume-high" size={14} color="#fff" />
                    <Text style={styles.titleText}>Nivel 2</Text>
                </TouchableOpacity>
                <View style={{ width: 28 }} />
            </View>

            {/* Lista de lecciones */}
            <FlatList
                data={lessons}
                keyExtractor={item => item.id}
                numColumns={2}
                renderItem={({ item }) => {
                    const isIntro = item.type === 'intro';
                    const match = item.id.match(/^leccion(\d+)$/);
                    const leccionNum = match ? parseInt(match[1], 10) : null;

                    // 3) Lógica de desbloqueo con offset:
                    const isUnlocked = isIntro
                        || (leccionNum !== null && leccionDesbloqueada >= level1Count + leccionNum);

                    return (
                        <TouchableOpacity
                            style={[styles.card, !isUnlocked && { opacity: 0.5 }]}
                            disabled={!isUnlocked}
                            onPress={async () => {
                                await stopAudioGlobal();
                                if (item.type === 'leccion') {
                                    // Ajusta la ruta según tu estructura real:
                                    // @ts-ignore
                                    router.push(`/(tabs)/niveles/nivel2/${item.id}/firstScreen`);
                                }
                            }}
                        >
                            <Image source={item.image} style={styles.image} resizeMode="contain" />
                            {isIntro ? (
                                <>
                                    <Text style={styles.subtitle}>{item.title}</Text>
                                    <TouchableOpacity
                                        onPress={async e => {
                                            e.stopPropagation();
                                            await stopAudioGlobal();
                                            await playAudioGlobal(item.audioFile);
                                        }}
                                        style={styles.playBar}
                                    >
                                        <Ionicons name="play" size={16} color="#fff" />
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <View style={styles.row}>
                                    <Text style={styles.subtitle}>{item.title}</Text>
                                    {isUnlocked && (
                                        <TouchableOpacity
                                            onPress={async e => {
                                                e.stopPropagation();
                                                await stopAudioGlobal();
                                                await playAudioGlobal(item.audioFile);
                                            }}
                                            style={styles.audioPill}
                                        >
                                            <Ionicons name="volume-high" size={18} color="#fff" />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                }}
                contentContainerStyle={styles.grid}
                // @ts-ignore
                ListFooterComponent={
                    haTerminadoNivel2 && (
                        <TouchableOpacity
                            onPress={() => {
                                stopAudioGlobal();
                                router.push('/(tabs)/Level3Screen');
                            }}
                            style={styles.nextButton}
                        >
                            <Ionicons name="arrow-forward" size={24} color="white" />
                        </TouchableOpacity>
                    )
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    titlePill: {
        backgroundColor: '#3E64FF',
        borderRadius: 30,
        paddingHorizontal: 12,
        paddingVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    titleText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    grid: { gap: 16, paddingHorizontal: 16 },
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
    image: { width: '100%', height: 90, marginBottom: 8 },
    subtitle: { fontSize: 14, fontWeight: '600', flexShrink: 1 },
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
    nextButton: {
        alignSelf: 'flex-end',
        marginRight: 16,
        marginTop: 24,
        marginBottom: 32,
        backgroundColor: '#33cc66',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
});
