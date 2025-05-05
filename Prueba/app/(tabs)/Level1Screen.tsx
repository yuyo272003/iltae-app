import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useRouter, usePathname, useNavigation, useFocusEffect} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { playAudioGlobal, stopAudioGlobal } from '@/utils/AudioManager';
import api from '@/scripts/api';

const lessons = [
    {
        id: 'intro',
        title: 'Introducción',
        type: 'intro',
        image: require('@assets/images/lecciones/nivel1/vocales.png'),
        audioFile: require('@assets/audio/levels/nivel1/introduccion.wav'),
    },
    {
        id: 'leccion1',
        carpeta: 'Aa',
        title: 'Introducción a las vocales',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel1/introduccion.png'),
        audioFile: require('@assets/audio/levels/nivel1/leccion1.wav'),
    },
    {
        id: 'leccion2',
        carpeta: 'Mm',
        title: 'Consonantes nasales',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel1/consonantes_basicas.png'),
        audioFile: require('@assets/audio/levels/nivel1/leccion2.wav'),
    },
    {
        id: 'leccion3',
        carpeta: 'Bb',
        title: 'Consonantes explosivas',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel1/consonantes_medias.png'),
        audioFile: require('@assets/audio/levels/nivel1/leccion3.wav'),
    },
    {
        id: 'leccion4',
        carpeta: 'Ff',
        title: 'Consonantes de aire',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel1/consonantes_complejas.png'),
        audioFile: require('@assets/audio/levels/nivel1/leccion4.wav'),
    },
    {
        id: 'leccion5',
        carpeta: 'Ll',
        title: 'Consonantes linguales',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel1/consonantes_linguales.png'),
        audioFile: require('@assets/audio/levels/nivel1/leccion5.wav'),
    },
    {
        id: 'leccion6',
        carpeta: 'Cc',
        title: 'Consonantes especiales',
        type: 'leccion',
        image: require('@assets/images/lecciones/nivel1/consonantes_especiales.png'),
        audioFile: require('@assets/audio/levels/nivel1/leccion6.wav'),
    },
];


export default function Level1Screen() {
    const router = useRouter();
    const [leccionDesbloqueada, setLeccionDesbloqueada] = useState(1);
    const haTerminadoNivel1 = leccionDesbloqueada > 6;

    // La función que obtiene los datos de la API
    const fetchLeccionDesbloqueada = useCallback(async () => {
        try {
            console.log('📥 Solicitando datos de progreso a la API...');
            const response = await api.post('/progreso/get-leccion');
            const id = parseInt(response.data.leccion_id);

            if (!isNaN(id)) {
                console.log('📥 Progreso actualizado:', id);
                setLeccionDesbloqueada(id);
            }
        } catch (error) {
            console.error('Error al obtener lección:', error);
        }
    }, []);

    // Este efecto solo se ejecuta cuando el componente se monta inicialmente
    useEffect(() => {
        console.log('Componente montado, obteniendo progreso inicial...');
        fetchLeccionDesbloqueada();

        // Limpieza cuando se desmonta completamente
        return () => {
            console.log('Componente desmontado, deteniendo audio...');
            stopAudioGlobal();
        };
    }, [fetchLeccionDesbloqueada]);

    // Este efecto se ejecutará cada vez que la pantalla vuelva a estar en foco
    useFocusEffect(
        useCallback(() => {
            console.log('Pantalla en foco, actualizando progreso...');
            fetchLeccionDesbloqueada();

            return () => {
                // No es necesario hacer nada cuando pierde el foco, solo cuando se desmonta
            };
        }, [fetchLeccionDesbloqueada])
    );

    // El resto del componente permanece igual, solo añadimos markForRefetch
    // cuando navegamos a una lección

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={async () => {
                        await stopAudioGlobal();
                        router.push('/(tabs)/niveles');
                    }}
                >
                    <Ionicons name="arrow-back" size={28} color="#3E64FF" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => playAudioGlobal(require('@assets/audio/levels/nivel1/intro.wav'))}
                    style={styles.titlePill}
                >
                    <Ionicons name="volume-high" size={14} color="#fff" />
                    <Text style={styles.titleText}>Nivel 1</Text>
                </TouchableOpacity>

                <View style={{ width: 28 }} />
            </View>

            <FlatList
                data={lessons}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => {
                    const isIntro = item.type === 'intro';
                    const leccionMatch = item.id.match(/^leccion(\d+)$/);
                    const leccionNum = leccionMatch ? parseInt(leccionMatch[1]) : null;

                    const isUnlocked = isIntro || (leccionNum !== null && leccionDesbloqueada >= leccionNum);

                    return (
                        <TouchableOpacity
                            style={[styles.card, !isUnlocked && { opacity: 0.5 }]}
                            disabled={!isUnlocked}
                            onPress={async () => {
                                await stopAudioGlobal();
                                if (item.type === 'leccion' && item.id && item.carpeta) {
                                    // @ts-ignore
                                    router.push(`/(tabs)/niveles/nivel1/${item.id}/${item.carpeta}/leccion`);
                                }
                            }}
                        >
                            <Image source={item.image} style={styles.image} resizeMode="contain" />
                            {isIntro ? (
                                <>
                                    <Text style={styles.subtitle}>{item.title}</Text>
                                    <TouchableOpacity
                                        onPress={async (e) => {
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
                                            onPress={async (e) => {
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
                    haTerminadoNivel1 ? (
                        <TouchableOpacity
                            onPress={() => {
                                stopAudioGlobal();
                                router.push('/(tabs)/Level2Screen');
                            }}
                            style={styles.nextButton}
                        >
                            <Ionicons name="arrow-forward" size={24} color="white" />
                        </TouchableOpacity>
                    ) : null
                }
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
    titlePill: {
        backgroundColor: '#3E64FF',
        borderRadius: 30,
        paddingHorizontal: 12,
        paddingVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    titleText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
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
    nextButton: {
        position: 'relative',
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