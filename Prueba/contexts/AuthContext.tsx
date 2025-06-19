import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import api from "@/scripts/api";

export type User = {
    id: number;
    name: string;
    niveles_completados: number;
    nivel_id: number;
    leccion_id: number;
} | null;

type AuthContextType = {
    user: User;
    setUser: (user: User) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>(null);

    const logout = async () => {
        try {
            const token = await AsyncStorage.getItem("auth_token");

            if (token) {
                await api.post(
                    "/logout",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    }
                );
            }
        } catch (error) {
            console.error("Error cerrando sesión:", error);
        } finally {
            await AsyncStorage.removeItem("auth_token");
            delete api.defaults.headers.common['Authorization']; // 🔑 Limpia el header global
            setUser(null);
            router.replace("/(tabs)/perfiles");
        }
    };


    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = await AsyncStorage.getItem("auth_token");
                if (!token) return;

                api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                const response = await api.getCurrentUser();
                if (response?.id) {
                    setUser(response);
                } else {
                    throw new Error("Perfil inválido");
                }
            } catch (error) {
                console.error("Error cargando perfil:", error);
                setUser(null);
                await AsyncStorage.removeItem("auth_token");
            }
        };

        fetchUserProfile();
    }, []);


    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};
