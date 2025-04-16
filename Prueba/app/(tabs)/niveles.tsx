import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { playAudioGlobal, stopAudioGlobal } from '@/utils/AudioManager';

type Nivel = {
    id: number;
    titulo: string;
    descripcion: string;
    estado: 'pendiente' | 'en progreso' | 'terminado';
};

const tabs = ['Todos', 'En progreso', 'Terminados'];

const nivelesBase: Nivel[] = [
    { id: 1, titulo: 'Nivel 1', descripcion: 'Aprendizaje de letras y sílabas', estado: 'pendiente' },
    { id: 2, titulo: 'Nivel 2', descripcion: 'Conoce las letras del abecedario', estado: 'pendiente' },
    { id: 3, titulo: 'Nivel 3', descripcion: 'Palabras con sílabas simples', estado: 'pendiente' },
    { id: 4, titulo: 'Nivel 4', descripcion: 'Combinaciones consonantes', estado: 'pendiente' },
    { id: 5, titulo: 'Nivel 5', descripcion: 'Lectura de oraciones', estado: 'pendiente' },
];

// ✅ Map de audios por nivel
const audiosPorNivel: { [key: number]: any } = {
    1: require('@/assets/audio/AudioNivel1.wav'),
    2: require('@/assets/audio/AudioNivel1.wav'),
    3: require('@/assets/audio/AudioNivel1.wav'),
    4: require('@/assets/audio/AudioNivel1.wav'),
    5: require('@/assets/audio/AudioNivel1.wav'),
};

export default function NivelesScreen() {
    const [selectedTab, setSelectedTab] = useState<string>('Todos');
    const { user, logout } = useAuth();
    const router = useRouter();

    // 🔊 Intro audio
    // @ts-ignore
    useEffect(() => {
        const reproducirIntro = async () => {
            await stopAudioGlobal();
            setTimeout(async () => {
                await playAudioGlobal(require('@/assets/audio/niveles.wav'));
            }, 50);
        };
        reproducirIntro();
        return () => stopAudioGlobal();
    }, []);

    useEffect(() => {
        const cambiarAudio = async () => {
            await stopAudioGlobal();
            setTimeout(async () => {
                let audioUri: any;
                if (selectedTab === 'Todos') audioUri = require('@/assets/audio/Todos.wav');
                if (selectedTab === 'En progreso') audioUri = require('@/assets/audio/progreso.wav');
                if (selectedTab === 'Terminados') audioUri = require('@/assets/audio/terminados.wav');
                if (audioUri) await playAudioGlobal(audioUri);
            }, 50);
        };
        cambiarAudio();
    }, [selectedTab]);

    const handlePlayAudio = async (audioUri: any) => {
        await stopAudioGlobal();
        setTimeout(async () => {
            await playAudioGlobal(audioUri);
        }, 50);
    };

    const mappedNiveles: Nivel[] = nivelesBase.map(nivel => {
        if (nivel.id === 1) {
            // Nivel 1: siempre disponible, terminado si ya completó al menos 1
            // @ts-ignore
            if (user?.niveles_completados >= 1) {
                return { ...nivel, estado: 'terminado' };
            } else {
                return { ...nivel, estado: 'en progreso' };
            }
        } else { // @ts-ignore
            if (user?.niveles_completados + 1 === nivel.id) {
                        return { ...nivel, estado: 'en progreso' };
                    } else { // @ts-ignore
                if (user?.niveles_completados >= nivel.id) {
                                        return { ...nivel, estado: 'terminado' };
                                    } else {
                                        return { ...nivel, estado: 'pendiente' };
                                    }
            }
        }
    });




    const filteredNiveles = mappedNiveles.filter(nivel => {
        if (selectedTab === 'Todos') return true;
        if (selectedTab === 'En progreso') return nivel.estado === 'en progreso';
        if (selectedTab === 'Terminados') return nivel.estado === 'terminado';
        return false;
    });

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
        const isActivo = nivel.estado === 'en progreso' || nivel.estado === 'terminado';

        return (
            <TouchableOpacity
                style={styles.nivelItem}
                disabled={!isActivo}
                onPress={onPress}
            >
                <View style={styles.nivelHeader}>
                    <Text style={[styles.nivelTitulo, { color: isActivo ? '#000' : '#999' }]}>{nivel.titulo}</Text>
                    <Ionicons
                        name="volume-high"
                        size={20}
                        color={isActivo ? '#2E6BE6' : '#aaa'}
                        style={styles.audioIcon}
                        onPress={() => isActivo && playAudio(audioUri)}
                    />
                </View>
                <Text style={[styles.descripcion, { color: isActivo ? '#666' : '#aaa' }]}>{nivel.descripcion}</Text>
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
