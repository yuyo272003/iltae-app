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

const lessons = [
    {
        id: 'intro',
        title: 'Introducción',
        type: 'intro',
        image: require('@assets/images/lecciones/nivel1/vocales.png'), // revisar
        audioFile: require('@assets/audio/levels/nivel3/introduccionGuia.wav'), // revisar
    },
    {
        id: 'leccion1',
        title: 'Combinación de consonantes',
        carpeta: 'bl',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel3/combinacion.png'), // revisar
        audioFile: require('@assets/audio/levels/nivel2/leccion1.wav'), // revisar
    },
    {
        id: 'leccion2',
        title: 'Consonantes combinadas y vocales',
        carpeta: 'a',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel3/combinadas.png'), // revisar
        audioFile: require('@assets/audio/levels/nivel2/leccion2.wav'), // revisar
    },
    {
        id: 'leccion3',
        title: 'Formación de palabras',
        carpeta: 'global',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel3/palabras.png'), // revisar
        audioFile: require('@assets/audio/levels/nivel2/leccion3.wav'),// revisar
    },
];

export default function Level3Screen() {
    const router = useRouter();
    const [leccionDesbloqueada, setLeccionDesbloqueada] = useState(1);

    // OFFSET: 6 lecciones de Nivel1 + 3 de Nivel2 = 9
    const levelOffset = 9;
    const lessonCount = lessons.filter(l => l.type === 'leccion').length; // = 3
    const lastGlobalId = levelOffset + lessonCount;                      // = 12

    const haTerminadoNivel3 = leccionDesbloqueada > lastGlobalId;

    const fetchLeccionDesbloqueada = useCallback(async () => {
        try {
            console.log('📥 Solicitando datos de progreso a la API...');
            const res = await api.post('/progreso/get-leccion');
            const id = parseInt(res.data.leccion_id, 10);
            if (!isNaN(id)) {
                console.log('📥 Progreso actualizado:', id);
                setLeccionDesbloqueada(id);
            }
        } catch (e) {
            console.error('Error al obtener lección:', e);
        }
    }, []);

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
                    onPress={() => playAudioGlobal(require('@assets/audio/levels/nivel3/nivel3.wav'))} // revisar
                    style={styles.titlePill}
                >
                    <Ionicons name="volume-high" size={14} color="#fff" />
                    <Text style={styles.titleText}>Nivel 3</Text>
                </TouchableOpacity>
                <View style={{ width: 28 }} />
            </View>

            {/* Lecciones */}
            <FlatList
                data={lessons}
                keyExtractor={item => item.id}
                numColumns={2}
                renderItem={({ item }) => {
                    const isIntro = item.type === 'intro';
                    const match = item.id.match(/^leccion(\d+)$/);
                    const leccionNum = match ? parseInt(match[1], 10) : null;

                    // desbloqueo: intro siempre; leccionN si globalID >= offset + N
                    const isUnlocked = isIntro
                        || (leccionNum !== null && leccionDesbloqueada >= levelOffset + leccionNum);

                    return (
                        <TouchableOpacity
                            style={[styles.card, !isUnlocked && { opacity: 0.5 }]}
                            disabled={!isUnlocked}
                            onPress={async () => {
                                await stopAudioGlobal();
                                if (item.type === 'leccion') {
                                    // @ts-ignore
                                    router.push(`/(tabs)/niveles/nivel3/${item.id}/${item.carpeta}/firstScreen`);
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
                ListFooterComponent={
                    haTerminadoNivel3
                        ? (
                            <TouchableOpacity
                                onPress={() => {
                                    stopAudioGlobal();
                                    // @ts-ignore
                                    router.push('/(tabs)/Level4Screen');
                                }}
                                style={styles.nextButton}
                            >
                                <Ionicons name="arrow-forward" size={24} color="white" />
                            </TouchableOpacity>
                        )
                        : null
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
