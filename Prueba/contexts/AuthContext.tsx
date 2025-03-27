import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

// Define el tipo del usuario (ajústalo a lo que te devuelve tu backend)
export type User = {
    id: number;
    name: string;
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

            await fetch("http://148.226.203.235/api/logout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            await AsyncStorage.removeItem("auth_token");
            setUser(null);
            router.replace("/perfiles"); // o '/welcome' si prefieres
        } catch (error) {
            console.error("Error cerrando sesión:", error);
        }
    };

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
