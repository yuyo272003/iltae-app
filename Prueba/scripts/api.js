
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Cambia solo esta línea cuando tu IP cambie
const LOCAL_IP = '192.168.0.20'; // 👈 solo aquí se cambia
const PORT = '8000';

const api = axios.create({
    baseURL: `http://${LOCAL_IP}:${PORT}/api`,
    timeout: 10000,
});

// Agregar automáticamente el token a cada petición
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
