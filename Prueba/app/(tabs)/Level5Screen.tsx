import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { playAudioGlobal, stopAudioGlobal } from '@/utils/AudioManager';
import api from '@/scripts/api';
import {useAuth} from "@/contexts/AuthContext";

const lessons = [
    // {
    //     id: 'intro',
    //     title: 'Introducción',
    //     type: 'intro',
    //     image: require('@assets/images/lecciones/nivel1/vocales.png'), // revisar
    //     audioFile: require('@assets/audio/levels/nivel2/intro.wav'), // revisar
    // },
    {
        id: 'leccion1',
        title: 'Acentuación',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel5/acentuacion.png'), // revisar
        audioFile: require('@assets/audio/levels/nivel5/leccion1.wav'), // revisar
    },
    {
        id: 'leccion2',
        title: 'Introducción a los signos de puntuación',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel5/signos.png'), // revisar
        audioFile: require('@assets/audio/levels/nivel5/leccion2.wav'), // revisar
    },
    {
        id: 'leccion3',
        title: 'Párrafos cortos',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel4/lectura.png'), // revisar
        audioFile: require('@assets/audio/levels/nivel5/leccion3.wav'),// revisar
    },

]

export default function Level5Screen() {
    const router = useRouter();
    const [leccionDesbloqueada, setLeccionDesbloqueada] = useState(1);

    // OFFSET: 6 (Nivel1) + 3 (Nivel2) + 3 (Nivel3) + 5 (Nivel4) = 17
    const levelOffset = 17;
    const lessonCount = lessons.length;        // = 3
    const lastGlobalId = levelOffset + lessonCount; // = 20

    const haTerminadoNivel5 = leccionDesbloqueada > lastGlobalId;

    const { user } = useAuth()                // o donde guardes tu user
    const usuarioId = user?.id

    const fetchLeccionDesbloqueada = useCallback(async () => {
        try {
            const response = await api.obtenerLeccionId(usuarioId)
            const id = parseInt(response.data.leccion_id, 10);
            if (!isNaN(id)) {
                setLeccionDesbloqueada(id);
            }
        } catch (error) {
            console.error('Error al obtener lección:', error);
        }
    }, [])

    useEffect(() => {
        fetchLeccionDesbloqueada();
        return () => { stopAudioGlobal(); };
    }, [fetchLeccionDesbloqueada]);

    useFocusEffect(useCallback(() => {
        fetchLeccionDesbloqueada();
    }, [fetchLeccionDesbloqueada]));

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
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
                    onPress={() => playAudioGlobal(require('@assets/audio/levels/nivel4/nivel4.wav'))}
                    style={styles.titlePill}
                >
                    <Ionicons name="volume-high" size={14} color="#fff" />
                    <Text style={styles.titleText}>Nivel 5</Text>
                </TouchableOpacity>
                <View style={{ width: 28 }} />
            </View>

            {/* Lecciones */}
            <FlatList
                data={lessons}
                keyExtractor={item => item.id}
                numColumns={2}
                renderItem={({ item }) => {
                    const match = item.id.match(/^leccion(\d+)$/);
                    const leccionNum = match ? parseInt(match[1], 10) : null;
                    const isUnlocked =
                        leccionNum !== null &&
                        leccionDesbloqueada >= levelOffset + leccionNum;

                    return (
                        <TouchableOpacity
                            style={[styles.card, !isUnlocked && { opacity: 0.5 }]}
                            disabled={!isUnlocked}
                            onPress={async () => {
                                await stopAudioGlobal();
                                // @ts-ignore
                                router.push(`/(tabs)/niveles/nivel5/${item.id}/firstScreen`);
                            }}
                        >
                            <Image source={item.image} style={styles.image} resizeMode="contain" />
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
                        </TouchableOpacity>
                    );
                }}
                contentContainerStyle={styles.grid}
                ListFooterComponent={
                    <View style={styles.footerContainer}>
                        {/* Botón de Audio Guía */}
                        <TouchableOpacity
                            onPress={async () => {
                                await stopAudioGlobal();
                                await playAudioGlobal(require('@assets/audio/levels/nivel4/introduccionGuia.wav'));
                            }}
                            style={styles.playButton}
                        >
                            <Ionicons name="play" size={22} color="white" />
                        </TouchableOpacity>
                        {/* Botón de Siguiente Nivel */}
                        {haTerminadoNivel5 && (
                            <TouchableOpacity
                                onPress={() => {
                                    stopAudioGlobal();
                                    // @ts-ignore
                                    router.push('/(tabs)/Level6Screen');
                                }}
                                style={styles.nextButton}
                            >
                                <Ionicons name="arrow-forward" size={24} color="white" />
                            </TouchableOpacity>
                        )}
                    </View>
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
        marginTop: 20,
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
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    subtitle: { fontSize: 14, fontWeight: '600', flexShrink: 1 },
    audioPill: {
        backgroundColor: '#3E64FF',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerContainer: {
        alignItems: 'flex-end',
        marginHorizontal: 16,
        marginTop: 24,
        marginBottom: 32,
    },
    playButton: {
        backgroundColor: '#2e6ef7',
        padding: 16,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        marginBottom: 15,
    },
    nextButton: {
        backgroundColor: '#33cc66',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
});
