//
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
//
// // Cambia solo esta línea cuando tu IP cambie
// const LOCAL_IP = 'backapp-production-1bef.up.railway.app';
// const PORT = '';
//
// const api = axios.create({
//     baseURL: `https://${LOCAL_IP}/api`,
//     timeout: 10000,
// });
//
// // Agregar automáticamente el token a cada petición
// api.interceptors.request.use(async (config) => {
//     const token = await AsyncStorage.getItem('auth_token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });
//
// export default api;

import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthenticatedSessionController } from '@/controllers/AuthenticatedSessionController'
import { ProgresoController } from '@/controllers/ProgresoController'
import {RegisteredUserController} from "@/controllers/RegisteredUserController";

const USE_LOCAL = true   // 🔀 Ponlo en false si quieres ir al backend PHP
const LOCAL_BASE = `https://backapp-production-1bef.up.railway.app/api`
const api = axios.create({
    baseURL: LOCAL_BASE,
    timeout: 10000,
})

// interceptor igual que antes
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('auth_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

export default {
    // ─── AUTENTICACIÓN ────────────────────────────
    // ── REGISTRO ─────────────────────────────────────────
    register: async (
        name: { name: string },
        email?: string,
        password?: string
    ) => {
        if (USE_LOCAL) {
            const res = await RegisteredUserController.store({ name })
            // opcional: guarda token en AsyncStorage
            // @ts-ignore
            await AsyncStorage.setItem('auth_token', res.json.token)
            return res.json
        } else {
            const { data } = await api.post('/register', { name })
            await AsyncStorage.setItem('auth_token', data.token)
            return data
        }
    },

    login: async (name: { name: string }) => {
        if (USE_LOCAL) {
            // llama a tu controlador local
            const res = await AuthenticatedSessionController.store({ name })
            if (res.status === 200) {
                // guarda el token en AsyncStorage (igual que con axios)
                // @ts-ignore
                await AsyncStorage.setItem('auth_token', res.json.token)
            }
            return res.json
        } else {
            const { data } = await api.post('/login', { name })
            await AsyncStorage.setItem('auth_token', data.token)
            return data
        }
    },

    logout: async () => {
        if (USE_LOCAL) {
            // @ts-ignore
            await AuthenticatedSessionController.destroy(/*userId opcional*/)
            await AsyncStorage.removeItem('auth_token')
            return { success: true }
        } else {
            const { data } = await api.post('/logout')
            await AsyncStorage.removeItem('auth_token')
            return data
        }
    },

    // ─── PROGRESO ───────────────────────────────────
    actualizarProgreso: async (usuario_id: number, leccion_id: number) => {
        if (USE_LOCAL) {
            const res = await ProgresoController.actualizarProgreso({ usuario_id, leccion_id })
            return res.json
        } else {
            const { data } = await api.post('/progreso', { usuario_id, leccion_id })
            return data
        }
    },

    verProgreso: async (usuario_id: number) => {
        if (USE_LOCAL) {
            const res = await ProgresoController.verProgreso(usuario_id)
            return res.json
        } else {
            const { data } = await api.get('/progreso')
            return data
        }
    },

    obtenerLeccionId: async (usuario_id: number | undefined) => {
        if (USE_LOCAL) {
            const res = await ProgresoController.obtenerLeccionId(usuario_id)
            return res.json
        } else {
            const { data } = await api.post('/progreso/get-leccion')
            return data
        }
    },

    obtenerNivelesCompletados: async (usuario_id: number | undefined) => {
        if (USE_LOCAL) {
            const res = await ProgresoController.obtenerNivelesCompletados(usuario_id)
            return res.json
        } else {
            const { data } = await api.post('/progreso/get-niveles-completados')
            return data
        }
    },



    // ─── AVANZAR LECCIÓN FIJAS ──────────────────────
    avanzarLeccion1: async (usuario_id: number) =>
        USE_LOCAL
            ? (await ProgresoController.avanzarLeccion1(usuario_id)).json
            : (await api.post('/progreso/avanzar-leccion-1')).data,

    avanzarLeccion2: async (usuario_id: number) =>
        USE_LOCAL
            ? (await ProgresoController.avanzarLeccion2(usuario_id)).json
            : (await api.post('/progreso/avanzar-leccion-2')).data,

    avanzarLeccion3: async (usuario_id: number) =>
        USE_LOCAL
            ? (await ProgresoController.avanzarLeccion3(usuario_id)).json
            : (await api.post('/progreso/avanzar-leccion-3')).data,

    avanzarLeccion4: async (usuario_id: number) =>
        USE_LOCAL
            ? (await ProgresoController.avanzarLeccion4(usuario_id)).json
            : (await api.post('/progreso/avanzar-leccion-4')).data,

    avanzarLeccion5: async (usuario_id: number) =>
        USE_LOCAL
            ? (await ProgresoController.avanzarLeccion5(usuario_id)).json
            : (await api.post('/progreso/avanzar-leccion-5')).data,

    avanzarLeccion6: async (usuario_id: number) =>
        USE_LOCAL
            ? (await ProgresoController.avanzarLeccion6(usuario_id)).json
            : (await api.post('/progreso/avanzar-leccion-6')).data,

    avanzarLeccion7: async (usuario_id: number) =>
        USE_LOCAL
            ? (await ProgresoController.avanzarLeccion7(usuario_id)).json
            : (await api.post('/progreso/avanzar-leccion-7')).data,

    avanzarLeccion8: async (usuario_id: number) =>
        USE_LOCAL
            ? (await ProgresoController.avanzarLeccion8(usuario_id)).json
            : (await api.post('/progreso/avanzar-leccion-8')).data,

    avanzarLeccion9: async (usuario_id: number) =>
        USE_LOCAL
            ? (await ProgresoController.avanzarLeccion9(usuario_id)).json
            : (await api.post('/progreso/avanzar-leccion-9')).data,

    avanzarLeccion10: async (usuario_id: number) =>
        USE_LOCAL
            ? (await ProgresoController.avanzarLeccion10(usuario_id)).json
            : (await api.post('/progreso/avanzar-leccion-10')).data,

    avanzarLeccion11: async (usuario_id: number) =>
        USE_LOCAL
            ? (await ProgresoController.avanzarLeccion11(usuario_id)).json
            : (await api.post('/progreso/avanzar-leccion-11')).data,

    avanzarLeccion12: async (usuario_id: number) =>
        USE_LOCAL
            ? (await ProgresoController.avanzarLeccion12(usuario_id)).json
            : (await api.post('/progreso/avanzar-leccion-12')).data,

    avanzarLeccion13: async (usuario_id: number) =>
        USE_LOCAL
            ? (await ProgresoController.avanzarLeccion13(usuario_id)).json
            : (await api.post('/progreso/avanzar-leccion-13')).data,

    avanzarLeccion14: async (usuario_id: number) =>
        USE_LOCAL
            ? (await ProgresoController.avanzarLeccion14(usuario_id)).json
            : (await api.post('/progreso/avanzar-leccion-14')).data,

    avanzarLeccion15: async (usuario_id: number) =>
        USE_LOCAL
            ? (await ProgresoController.avanzarLeccion15(usuario_id)).json
            : (await api.post('/progreso/avanzar-leccion-15')).data,

    avanzarLeccion16: async (usuario_id: number) =>
        USE_LOCAL
            ? (await ProgresoController.avanzarLeccion16(usuario_id)).json
            : (await api.post('/progreso/avanzar-leccion-16')).data,

    avanzarLeccion17: async (usuario_id: number) =>
        USE_LOCAL
            ? (await ProgresoController.avanzarLeccion17(usuario_id)).json
            : (await api.post('/progreso/avanzar-leccion-17')).data,

    avanzarLeccion18: async (usuario_id: number) =>
        USE_LOCAL
            ? (await ProgresoController.avanzarLeccion18(usuario_id)).json
            : (await api.post('/progreso/avanzar-leccion-18')).data,

    avanzarLeccion19: async (usuario_id: number) =>
        USE_LOCAL
            ? (await ProgresoController.avanzarLeccion19(usuario_id)).json
            : (await api.post('/progreso/avanzar-leccion-19')).data,

    avanzarLeccion20: async (usuario_id: number) =>
        USE_LOCAL
            ? (await ProgresoController.avanzarLeccion20(usuario_id)).json
            : (await api.post('/progreso/avanzar-leccion-20')).data,
}



