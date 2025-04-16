import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import api from "@/scripts/api";

// Ahora incluye niveles_completados
export type User = {
    id: number;
    name: string;
    niveles_completados: number;
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
            setUser(null);
            router.replace("/(tabs)/perfiles");
        }
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = await AsyncStorage.getItem("auth_token");
            if (!token) return;

            try {
                const response = await api.get("/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });

                setUser(response.data);
            } catch (error) {
                console.error("Error al obtener el perfil de usuario:", error);
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
