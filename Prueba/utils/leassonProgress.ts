// 📁 src/utils/avanzarLeccion.ts
import api from "@/scripts/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const avanzarLeccion = async () => {
    try {
        const token = await AsyncStorage.getItem("auth_token");
        console.log("Token encontrado:", token); //debug ya funcionó y ni sé q hice
        if (!token) throw new Error("Token no encontrado");

        const response = await api.post(
            "/progreso/avanzar",
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
