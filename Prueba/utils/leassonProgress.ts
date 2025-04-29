import api from "@/scripts/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const avanzarLeccion = async (nivelPantalla: number, leccionPantalla: number) => {
    try {
        const token = await AsyncStorage.getItem("auth_token");

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

        const data = response.data;

        console.log("✅ Datos recibidos al intentar avanzar:", data);

        // 👇 Verificamos si debe o no avanzar realmente
        if (data.nivel_id === nivelPantalla && data.leccion_id === leccionPantalla) {
            console.log("📚 Avance permitido.");
            return data;
        } else {
            console.log("🔄 Repetición detectada, no se actualizará el progreso real.");
            return { ...data, repeticion: true }; // Marcamos como repetición
        }
    } catch (error) {
        console.error("Error al avanzar lección:", error);
        throw error;
    }
};
