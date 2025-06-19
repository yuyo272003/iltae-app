import { executeSql } from "@/db/executeSql";

export class UserController {
    static async showByToken(token: string) {
        try {
            const rows = await executeSql(
                `SELECT u.id, u.name
                 FROM users u
                 JOIN personal_access_tokens t ON t.tokenable_id = u.id
                 WHERE t.token = ?
                 LIMIT 1`,
                [token]
            );
            if (!rows.length) {
                return { status: 404, json: { message: 'Usuario no encontrado' } };
            }
            const user = rows[0];
            // Obtener último progreso
            const progresos = await executeSql(
                'SELECT * FROM progreso WHERE usuario_id = ? ORDER BY id DESC LIMIT 1',
                [user.id]
            );
            const ultimoProgreso = progresos.length ? progresos[0] : null;
            const nivelesCompletados = ultimoProgreso?.niveles_completados || 0;
            const nivel_id = ultimoProgreso?.nivel_id;
            const leccion_id = ultimoProgreso?.leccion_id;
            return {
                status: 200,
                json: { ...user, niveles_completados: nivelesCompletados, nivel_id, leccion_id }
            };
        } catch (error) {
            return { status: 500, json: { message: 'Error interno', error } };
        }
    }
}
