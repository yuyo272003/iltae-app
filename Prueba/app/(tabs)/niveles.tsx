import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

const NivelItem = ({ nivel }: { nivel: Nivel }): JSX.Element => {
    const isActivo = nivel.estado === 'en progreso';

    return (
        <TouchableOpacity style={styles.nivelItem} disabled={!isActivo}>
            <View style={styles.nivelHeader}>
                <Text style={[styles.nivelTitulo, { color: isActivo ? '#000' : '#999' }]}>{nivel.titulo}</Text>
                <Ionicons
                    name="volume-high"
                    size={20}
                    color={isActivo ? '#2E6BE6' : '#aaa'}
                    style={styles.audioIcon}
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

    const filteredNiveles = niveles.filter(nivel => {
        if (selectedTab === 'Todos') return true;
        if (selectedTab === 'En progreso') return nivel.estado === 'en progreso';
        if (selectedTab === 'Terminados') return nivel.estado === 'terminado';
        return false;
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Niveles</Text>

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
                renderItem={({ item }) => <NivelItem nivel={item} />}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F1F3F6',
        borderRadius: 30,
        padding: 4,
        marginBottom: 20,
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
