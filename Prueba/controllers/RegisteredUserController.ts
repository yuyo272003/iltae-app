import { executeSql } from "@/db/executeSql";

export class RegisteredUserController {
    /**
     * Registra un nuevo usuario y su progreso inicial.
     */
    static async store(requestBody: { name: { name: string } }) {
        try {
            const { name, email } = requestBody;
            if (!name || name.trim() === "") {
                return { status: 422, json: { message: "El nombre es requerido" } };
            }

            // Verificar unicidad de nombre de usuario
            const existing = await executeSql(
                "SELECT id FROM users WHERE name = ? LIMIT 1",
                [name]
            );
            if (existing.length) {
                return { status: 422, json: { message: "El nombre de usuario ya existe" } };
            }

            // Crear el usuario
            const insertRes = await executeSql(`INSERT INTO users (name, remember_token, created_at, updated_at)
     VALUES (?, ?, datetime('now'), datetime('now'))`, [name, null]);

            // SQLite no devuelve lastID con SELECT, así que consultamos el último
            const rows = await executeSql("SELECT id, name FROM users ORDER BY id DESC LIMIT 1");
            const user = rows[0];

            // Simular creación de token
            const token = 'token-' + Math.random().toString(36).substring(2);

            // Insertar en personal_access_tokens
            await executeSql(
                `INSERT INTO personal_access_tokens 
     (tokenable_type, tokenable_id, name, token, abilities, created_at, updated_at)
   VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
                [
                    "user",             // tokenable_type
                    user.id,            // tokenable_id
                    "API Token",        // name
                    token,              // token
                    '["*"]'             // abilities como JSON válido
                ]
            );


            // Obtener la primera lección disponible
            const firstLesson = await executeSql("SELECT id, nivel_id FROM lecciones ORDER BY id LIMIT 1");
            if (firstLesson.length) {
                const lesson = firstLesson[0];
                // Crear progreso inicial
                await executeSql(`INSERT INTO progreso (usuario_id, nivel_id, leccion_id, porcentaje, niveles_completados, created_at, updated_at)
       VALUES (?, ?, ?, 0, 0, datetime('now'), datetime('now'))`, [user.id, lesson.nivel_id, lesson.id]);
            }

            return {
                status: 201,
                json: { user, token },
            };
        } catch (error) {
            console.error("Error registrando usuario:", error);
            return { status: 500, json: { message: "Error interno al registrar usuario", error } };
        }
    }
}
