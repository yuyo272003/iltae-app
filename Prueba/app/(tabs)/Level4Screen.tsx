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
    // {
    //     id: 'intro',
    //     title: 'Introducción',
    //     type: 'intro',
    //     image: require('@assets/images/lecciones/nivel1/vocales.png'), // revisar
    //     audioFile: require('@assets/audio/levels/nivel4/introduccionGuia.wav'), 
    // },
    {
        id: 'leccion1',
        title: 'Monosilabas',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel4/monosilabas.png'), // revisar
        audioFile: require('@assets/audio/levels/nivel4/introduccionMonosilabas.wav'), 
    },
    {
        id: 'leccion2',
        title: 'Bisílabas',
        carpeta: 'a',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel4/bisilabas.png'), // revisar
        audioFile: require('@assets/audio/levels/nivel4/introduccionBisilabas.wav'), 
    },
    {
        id: 'leccion3',
        title: 'Trisílabas',
        carpeta: 'global',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel4/trisilabas.png'), // revisar
        audioFile: require('@assets/audio/levels/nivel4/introduccionTrisilabas.wav'),
    },
    {
        id: 'leccion4',
        title: 'Polisílabas',
        carpeta: 'global',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel4/polisilabas.png'), // revisar
        audioFile: require('@assets/audio/levels/nivel4/introduccionPolisilabas.wav'),// revisar
    },
    {
        id: 'leccion5',
        title: 'Lectura de Oraciones',
        carpeta: 'global',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel4/lectura.png'), // revisar
        audioFile: require('@assets/audio/levels/nivel4/introduccionLecturaOraciones.wav'),// revisar
    },
];

export default function Level4Screen() {
    const router = useRouter();
    const [leccionDesbloqueada, setLeccionDesbloqueada] = useState(1);

    // OFFSET: 6 (Nivel1) + 3 (Nivel2) + 3 (Nivel3) = 12
    const levelOffset = 12;
    const lessonCount = lessons.filter(l => l.type === 'leccion').length; // = 5
    const lastGlobalId = levelOffset + lessonCount;                      // = 17

    const haTerminadoNivel4 = leccionDesbloqueada > lastGlobalId;

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
                    onPress={() => playAudioGlobal(require('@assets/audio/levels/nivel5/nivel5.wav'))}
                    style={styles.titlePill}
                >
                    <Ionicons name="volume-high" size={14} color="#fff" />
                    <Text style={styles.titleText}>Nivel 4</Text>
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

                    // Intro siempre; la lección N si el globalID ≥ offset + N
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
                                    router.push(`/(tabs)/niveles/nivel4/${item.id}/firstScreen`);
                                }
                            }}
                        >
                            <Image source={item.image} style={styles.image} resizeMode="contain" />
                            {isIntro ? (
                                <>
                                    {/* Se eliminó el Text que mostraba el título de la introducción */}
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
                    <View style={styles.footerContainer}>
                        {/* El play button aparece siempre */}
                        <TouchableOpacity
                            onPress={async () => {
                                await stopAudioGlobal();
                                await playAudioGlobal(require('@assets/audio/levels/nivel4/introduccionGuia.wav'));
                            }}
                            style={styles.playButton}
                        >
                            <Ionicons name="play" size={22} color="white" />
                        </TouchableOpacity>
                        
                        {/* El next button solo aparece cuando ha terminado el nivel */}
                        {haTerminadoNivel4 && (
                            <TouchableOpacity
                                onPress={() => {
                                    stopAudioGlobal();
                                    // @ts-ignore
                                    router.push('/(tabs)/Level5Screen');
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
    container: { 
        flex: 1, 
        backgroundColor: '#fff' 
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 16, // 50
        marginTop: 20,
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
    playButton: {
        backgroundColor: '#2e6ef7',
        padding: 16,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        marginBottom: 15,
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
    footerContainer: {
        alignItems: 'flex-end',
        marginRight: 9,
        marginLeft: 9,
        marginTop: 15,
        marginBottom: 32,
    },
    nextButton: {
        backgroundColor: '#33cc66',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 3,
    },    
});