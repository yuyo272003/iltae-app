import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av'; // Importamos expo-av
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

type Nivel = {
    id: number;
    titulo: string;
    descripcion: string;
    estado: 'pendiente' | 'en progreso' | 'terminado';
};

const tabs = ['Todos', 'En progreso', 'Terminados'];

const niveles: Nivel[] = [
    { id: 1, titulo: 'Nivel 1', descripcion: 'Aprendizaje de letras y sílabas', estado: 'en progreso' },
    { id: 2, titulo: 'Nivel 2', descripcion: 'Conoce las letras del abecedario', estado: 'pendiente' },
    { id: 3, titulo: 'Nivel 3', descripcion: 'Conoce las letras del abecedario', estado: 'pendiente' },
    { id: 4, titulo: 'Nivel 4', descripcion: 'Conoce las letras del abecedario', estado: 'pendiente' },
    { id: 5, titulo: 'Nivel 5', descripcion: 'Conoce las letras del abecedario', estado: 'pendiente' },
];

const NivelItem = ({
                       nivel,
                       onPress,
                       playAudio, // Recibimos la función playAudio
                       audioUri // URI del audio específico
                   }: {
    nivel: Nivel;
    onPress?: () => void;
    playAudio: (audioUri: any) => void;
    audioUri: any; // Cambié el tipo a 'any' ya que será un require
}): JSX.Element => {
    const isActivo = nivel.estado === 'en progreso';

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
                    onPress={() => playAudio(audioUri)} // Llamamos a la función de reproducción con la URI del audio
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

export default function NivelesScreen() {
    const [selectedTab, setSelectedTab] = useState<string>('Todos');
    const { logout } = useAuth();
    const router = useRouter();
    const [sound, setSound] = useState<any>(null); // Estado para manejar el audio

    const playAudio = async (audioUri: any) => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                audioUri
            );
            setSound(sound);
            await sound.playAsync();
        } catch (error) {
            console.error("Error al reproducir el audio:", error);
        }
    };

    useEffect(() => {
        // Reproducir un audio cada vez que se cambia el tab
        let audioUri: any = '';
        if (selectedTab === 'Todos') {
            audioUri = require('@/assets/audio/Todos.wav'); // Cambia esta ruta por la de tu archivo local
        } else if (selectedTab === 'En progreso') {
            audioUri = require('@/assets/audio/progreso.wav'); // Cambia esta ruta por la de tu archivo local
        } else if (selectedTab === 'Terminados') {
            audioUri = require('@/assets/audio/terminados.wav'); // Cambia esta ruta por la de tu archivo local
        }
        playAudio(audioUri);
    }, [selectedTab]);

    const filteredNiveles = niveles.filter(nivel => {
        if (selectedTab === 'Todos') return true;
        if (selectedTab === 'En progreso') return nivel.estado === 'en progreso';
        if (selectedTab === 'Terminados') return nivel.estado === 'terminado';
        return false;
    });

    return (
        <View style={styles.container}>
            {/* Botón de cerrar sesión */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={logout}
            >
                <Ionicons name="arrow-back" size={24} color="blue" />
            </TouchableOpacity>

            {/* Encabezado con el título y el botón de audio */}
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Niveles</Text>
                <Ionicons
                    name="volume-high"
                    size={20}
                    color="#2E6BE6"
                    style={styles.audioIconHeader}
                    onPress={() => playAudio(require('@/assets/audio/niveles.wav'))} // Audio para el título de Niveles
                    //audioUri={require(`@/assets/audio/audioNivel${item.id}.mp3`)} // Ruta local por nivel
                />
            </View>

            {/* Tabs */}
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

            {/* Lista de niveles */}
            <FlatList
                data={filteredNiveles}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <NivelItem
                        nivel={item}
                        onPress={() => {
                            if (item.id === 1) {
                                router.push('/(tabs)/Level1Screen');
                            }
                        }}
                        playAudio={playAudio}
                        audioUri={require(`@/assets/audio/AudioNivel1.wav`)} // Ruta local por nivel
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
        paddingTop: 80, // Aumento el padding superior para dar más espacio en la parte superior
    },
    backButton: {
        position: 'absolute',
        top: 60, // Aumento el espacio para el botón de volver
        left: 25,
        zIndex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 150, // Reduzco el margen inferior para juntar el título con el botón de audio
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10, // Ajusto el margen entre el título y el botón
    },
    audioIconHeader: {
        marginRight: 120, // Reduzco el margen para acercar el ícono al título
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F1F3F6',
        borderRadius: 30,
        padding: 4,
        marginBottom: 30, // Mayor espacio entre las pestañas y los niveles
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
