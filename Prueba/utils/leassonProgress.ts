// 📁 src/utils/avanzarLeccion.ts
import api from "@/scripts/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const avanzarLeccion = async (endpoint: string) => {
    try {
        const token = await AsyncStorage.getItem("auth_token");
        console.log("Token encontrado:", token); // debug opcional

        if (!token) throw new Error("Token no encontrado");

        const response = await api.post(
            endpoint, // 🔥 Usamos el endpoint que nos pasen
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error al avanzar de lección:", error);
        throw error;
    }
};
