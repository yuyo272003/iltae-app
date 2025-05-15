import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useFocusEffect } from 'expo-router';
import { playAudioGlobal, stopAudioGlobal } from '@/utils/AudioManager';
import api from '@/scripts/api';

type Nivel = {
    id: number;
    titulo: string;
    descripcion: string;
    estado: 'pendiente' | 'en progreso' | 'terminado';
};

const tabs = ['Todos', 'En progreso', 'Terminados'];
const nivelesBase: Nivel[] = [
    { id: 1, titulo: 'Nivel 1', descripcion: 'Aprendizaje del alfabeto', estado: 'pendiente' },
    { id: 2, titulo: 'Nivel 2', descripcion: 'Consonantes y Vocales', estado: 'pendiente' },
    { id: 3, titulo: 'Nivel 3', descripcion: 'Combinaciones de consonantes', estado: 'pendiente' },
    { id: 4, titulo: 'Nivel 4', descripcion: 'Sílabas', estado: 'pendiente' },
    { id: 5, titulo: 'Nivel 5', descripcion: 'Acentuación y signos de puntuación', estado: 'pendiente' },
];
const audiosPorNivel: { [key: number]: any } = {
    1: require('@/assets/audio/AudioNivel1.wav'),
    2: require('@/assets/audio/AudioNivel2.wav'),
    3: require('@/assets/audio/AudioNivel3.wav'),
    4: require('@/assets/audio/AudioNivel4.wav'),
    5: require('@/assets/audio/AudioNivel5.wav'),
};

export default function NivelesScreen() {
    const { user, logout } = useAuth();
    const router = useRouter();

    // 1. Estado local para completados
    const [nivelesCompletados, setNivelesCompletados] = useState<number>(user?.niveles_completados ?? 0);
    const [selectedTab, setSelectedTab] = useState<string>('Todos');

    // 2. Función para obtener del API los niveles completados
    const fetchNivelesCompletados = useCallback(async () => {
        try {
            console.log('📥 Solicitando niveles completados a la API...');
            const response = await api.post('/progreso/get-niveles-completados');
            const completed = parseInt(response.data.niveles_completados, 10);
            if (!isNaN(completed)) {
                console.log('✅ Niveles completados:', completed);
                setNivelesCompletados(completed);
            }
        } catch (error) {
            console.error('Error al obtener niveles completados:', error);
        }
    }, []);

    // 3. Refrescar al montar y cada vez que vuelvas a la pantalla
    useEffect(() => {
        fetchNivelesCompletados();
        return () => {
            stopAudioGlobal();
        };
    }, [fetchNivelesCompletados]);

    useFocusEffect(
        useCallback(() => {
            fetchNivelesCompletados();
        }, [fetchNivelesCompletados])
    );

    // Gestión de audio e ítem de nivel (igual que antes)
    // @ts-ignore
    useEffect(() => {
        const reproducirIntro = async () => {
            await stopAudioGlobal();
            setTimeout(() => playAudioGlobal(require('@/assets/audio/niveles.wav')), 50);
        };
        reproducirIntro();
        return () => stopAudioGlobal();
    }, []);

    useEffect(() => {
        const cambiarAudio = async () => {
            await stopAudioGlobal();
            setTimeout(() => {
                let audioUri;
                if (selectedTab === 'Todos') audioUri = require('@/assets/audio/Todos.wav');
                if (selectedTab === 'En progreso') audioUri = require('@/assets/audio/progreso.wav');
                if (selectedTab === 'Terminados') audioUri = require('@/assets/audio/terminados.wav');
                audioUri && playAudioGlobal(audioUri);
            }, 50);
        };
        cambiarAudio();
    }, [selectedTab]);

    // 4. Mapeo usando nivelesCompletados en lugar de user.niveles_completados
    const mappedNiveles = nivelesBase.map(nivel => {
        if (nivel.id === 1) {
            if (nivelesCompletados >= 1) return { ...nivel, estado: 'terminado' };
            return { ...nivel, estado: 'en progreso' };
        }
        if (nivelesCompletados + 1 === nivel.id) {
            return { ...nivel, estado: 'en progreso' };
        }
        if (nivelesCompletados >= nivel.id) {
            return { ...nivel, estado: 'terminado' };
        }
        return { ...nivel, estado: 'pendiente' };
    });

    const filteredNiveles = mappedNiveles.filter(nivel =>
        selectedTab === 'Todos'
            ? true
            : selectedTab === 'En progreso'
                ? nivel.estado === 'en progreso'
                : nivel.estado === 'terminado'
    );

    const handlePlayAudio = async (audioUri: any) => {
        await stopAudioGlobal();
        setTimeout(() => playAudioGlobal(audioUri), 50);
    };

    const NivelItem = ({
                           nivel,
                           onPress,
                           playAudio,
                           audioUri,
                       }: {
        nivel: Nivel;
        onPress?: () => void;
        playAudio: (audioUri: any) => void;
        audioUri: any;
    }): JSX.Element => {
        const isActivo = nivel.estado !== 'pendiente';
        return (
            <TouchableOpacity
                style={styles.nivelItem}
                disabled={!isActivo}
                onPress={onPress}
            >
                <View style={styles.nivelHeader}>
                    <Text style={[styles.nivelTitulo, { color: isActivo ? '#000' : '#999' }]}>
                        {nivel.titulo}
                    </Text>
                    <Ionicons
                        name="volume-high"
                        size={20}
                        color={isActivo ? '#2E6BE6' : '#aaa'}
                        style={styles.audioIcon}
                        onPress={() => isActivo && playAudio(audioUri)}
                    />
                </View>
                <Text style={[styles.descripcion, { color: isActivo ? '#666' : '#aaa' }]}>
                    {nivel.descripcion}
                </Text>
                {isActivo && (
                    <Ionicons
                        name="chevron-forward"
                        size={18}
                        color="#000"
                        style={styles.arrow}
                    />
                )}
            </TouchableOpacity>
        );
    };

    // @ts-ignore
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={async () => {
                    await stopAudioGlobal();
                    logout();
                }}
            >
                <Ionicons name="arrow-back" size={32} color="blue" />
            </TouchableOpacity>

            <View style={styles.headerCenterContainer}>
                <TouchableOpacity
                    style={styles.headerAudioTitle}
                    onPress={() => handlePlayAudio(require('@/assets/audio/niveles.wav'))}
                >
                    <Ionicons name="volume-high" size={18} color="#2E6BE6" />
                    <Text style={styles.title}>Niveles</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.tabsContainer}>
                {tabs.map(tab => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, selectedTab === tab && styles.activeTab]}
                        onPress={() => setSelectedTab(tab)}
                    >
                        <Ionicons
                            name="volume-high"
                            size={14}
                            color={selectedTab === tab ? '#fff' : '#2E6BE6'}
                        />
                        <Text style={[styles.tabText, selectedTab === tab && { color: '#fff' }]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={filteredNiveles}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <NivelItem
                        // @ts-ignore
                        nivel={item}
                        onPress={async () => {
                            await stopAudioGlobal();
                            if (item.estado !== 'pendiente') {
                                // @ts-ignore
                                router.push(`/(tabs)/Level${item.id}Screen`);
                            }
                        }}
                        playAudio={handlePlayAudio}
                        audioUri={audiosPorNivel[item.id]}
                    />
                )}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        paddingTop: 80,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 2,
    },
    headerCenterContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    headerAudioTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F1F3F6',
        borderRadius: 30,
        padding: 4,
        marginBottom: 30,
        maxWidth: '90%',
        alignSelf: 'center',
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 30,
    },
    activeTab: {
        backgroundColor: '#2E6BE6',
    },
    tabText: {
        marginLeft: 6,
        color: '#2E6BE6',
        fontWeight: '600',
    },
    nivelItem: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        position: 'relative',
    },
    nivelHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nivelTitulo: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    audioIcon: {
        marginLeft: 8,
    },
    descripcion: {
        marginTop: 4,
        fontSize: 14,
    },
    arrow: {
        position: 'absolute',
        right: 10,
        top: 18,
    },
});
