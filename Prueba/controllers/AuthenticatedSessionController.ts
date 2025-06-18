import { executeSql } from "@/db/executeSql";

export class AuthenticatedSessionController {
    // Maneja autenticación local por nombre de usuario
    static async store(requestBody: { name?: string }) {
        try {
            if (!requestBody.name || requestBody.name.trim() === '') {
                return {
                    status: 422,
                    json: { message: 'El nombre es requerido' },
                };
            }

            // Buscar usuario por nombre
            const users = await executeSql('SELECT * FROM users WHERE name = ? LIMIT 1', [
                requestBody.name,
            ]);
            const user = users.length ? users[0] : null;

            if (!user) {
                return {
                    status: 422,
                    json: { message: 'Usuario no encontrado' },
                };
            }

            // Simular login (no hay sesión real)
            // Podrías guardar info localmente en AsyncStorage o contexto si quieres

            // Simular token (puedes cambiar por JWT u otro método)
            const token = 'fake-token-' + Math.random().toString(36).slice(2);

            // Obtener último progreso del usuario
            const progresos = await executeSql(
                'SELECT * FROM progreso WHERE usuario_id = ? ORDER BY id DESC LIMIT 1',
                [user.id]
            );
            const ultimoProgreso = progresos.length ? progresos[0] : null;
            const nivelesCompletados = ultimoProgreso?.niveles_completados || 0;

            return {
                status: 200,
                json: {
                    user,
                    token,
                    niveles_completados: nivelesCompletados,
                },
            };
        } catch (error) {
            return {
                status: 500,
                json: { message: 'Error interno', error },
            };
        }
    }

    // Simular cierre de sesión
    static async destroy(userId: number) {
        try {
            // Aquí limpiarías tokens guardados localmente

            return {
                status: 201,
                json: {
                    success: true,
                    message: 'Sesión cerrada',
                },
            };
        } catch (error) {
            return {
                status: 500,
                json: { message: 'Error interno', error },
            };
        }
    }
}
