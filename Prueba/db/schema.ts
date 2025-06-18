import { openDatabaseSync } from 'expo-sqlite';

// Abrir la base de datos
const db = openDatabaseSync('iltae.db');

// Crear tablas (basado en tus migraciones Laravel)
export function createTables() {
    try {
        // Tabla: users
        db.execSync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        remember_token TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // Tabla: sessions
        db.execSync(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id INTEGER,
        ip_address TEXT,
        user_agent TEXT,
        payload TEXT NOT NULL,
        last_activity INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      );
    `);

        // Tabla: personal_access_tokens
        db.execSync(`
      CREATE TABLE IF NOT EXISTS personal_access_tokens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tokenable_type TEXT NOT NULL,
        tokenable_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        token TEXT UNIQUE NOT NULL,
        abilities TEXT,
        last_used_at TEXT,
        expires_at TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // Tabla: niveles
        db.execSync(`
      CREATE TABLE IF NOT EXISTS niveles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        numero_lecciones INTEGER NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // Tabla: lecciones
        db.execSync(`
      CREATE TABLE IF NOT EXISTS lecciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nivel_id INTEGER NOT NULL,
        titulo TEXT NOT NULL,
        orden INTEGER NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (nivel_id) REFERENCES niveles(id) ON DELETE CASCADE
      );
    `);

        // Tabla: progreso
        db.execSync(`
      CREATE TABLE IF NOT EXISTS progreso (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        nivel_id INTEGER NOT NULL,
        leccion_id INTEGER NOT NULL,
        porcentaje REAL NOT NULL DEFAULT 0,
        niveles_completados INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (nivel_id) REFERENCES niveles(id) ON DELETE CASCADE,
        FOREIGN KEY (leccion_id) REFERENCES lecciones(id) ON DELETE CASCADE
      );
    `);

        // Crear índices para mejor rendimiento
        createIndexes();

        console.log('✅ Tablas creadas exitosamente');
    } catch (error) {
        console.error('❌ Error al crear tablas:', error);
        throw error;
    }
}

// Crear índices para optimizar consultas
function createIndexes() {
    try {
        db.execSync('CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);');
        db.execSync('CREATE INDEX IF NOT EXISTS idx_lecciones_nivel_id ON lecciones(nivel_id);');
        db.execSync('CREATE INDEX IF NOT EXISTS idx_progreso_usuario_id ON progreso(usuario_id);');
        db.execSync('CREATE INDEX IF NOT EXISTS idx_progreso_nivel_id ON progreso(nivel_id);');
        db.execSync('CREATE INDEX IF NOT EXISTS idx_progreso_leccion_id ON progreso(leccion_id);');

        console.log('✅ Índices creados exitosamente');
    } catch (error) {
        console.error('❌ Error al crear índices:', error);
    }
}

export function seedDatabase() {
    try {
        // Limpiar datos existentes
        db.execSync('DELETE FROM lecciones;');
        db.execSync('DELETE FROM niveles;');

        // Seed de niveles
        seedNiveles();

        // Seed de lecciones
        seedLecciones();

        console.log('✅ Seeders ejecutados correctamente');
        return true;
    } catch (error) {
        console.error('❌ Error al ejecutar seeders:', error);
        throw error;
    }
}

// Seeder para niveles
function seedNiveles() {
    const niveles = [
        { nombre: 'Aprendizaje de letras y sílabas', numero_lecciones: 6 },
        { nombre: 'Formación de Palabras y Lectura Básica', numero_lecciones: 4 },
        { nombre: 'Aprendizaje', numero_lecciones: 3 },
        { nombre: 'Aprendizaje', numero_lecciones: 5 },
        { nombre: 'Aprendizaje', numero_lecciones: 3 }
    ];

    niveles.forEach(nivel => {
        db.runSync(
            'INSERT INTO niveles (nombre, numero_lecciones) VALUES (?, ?)',
            [nivel.nombre, nivel.numero_lecciones]
        );
    });

    console.log('✅ Niveles insertados');
}

// Seeder para lecciones
function seedLecciones() {
    const lecciones = [
        // Nivel 1
        { nivel_id: 1, titulo: 'Introducción a las vocales', orden: 1 },
        { nivel_id: 1, titulo: 'Consonantes nasales', orden: 2 },
        { nivel_id: 1, titulo: 'Consonantes explosivas', orden: 3 },
        { nivel_id: 1, titulo: 'Consonantes de aire', orden: 4 },
        { nivel_id: 1, titulo: 'Consonantes linguales', orden: 5 },
        { nivel_id: 1, titulo: 'Consonantes especiales', orden: 6 },

        // Nivel 2
        { nivel_id: 2, titulo: 'Revisión y práctica de consonantes', orden: 1 },
        { nivel_id: 2, titulo: 'Consonantes y vocales', orden: 2 },
        { nivel_id: 2, titulo: 'Práctica de palabras', orden: 3 },

        // Nivel 3
        { nivel_id: 3, titulo: 'Combinación de consonantes', orden: 1 },
        { nivel_id: 3, titulo: 'Consonantes combinadas y vocales', orden: 2 },
        { nivel_id: 3, titulo: 'Formación de palabras', orden: 2 },

        // Nivel 4
        { nivel_id: 4, titulo: 'Monosílabas', orden: 1 },
        { nivel_id: 4, titulo: 'Bisílabas', orden: 2 },
        { nivel_id: 4, titulo: 'Trisílabasb', orden: 3 },
        { nivel_id: 4, titulo: 'Polisílabas', orden: 4 },
        { nivel_id: 4, titulo: 'Lectura de oraciones', orden: 5 },

        // Nivel 5
        { nivel_id: 5, titulo: 'Acentuación', orden: 1 },
        { nivel_id: 5, titulo: 'Introducción a los signos de puntuación', orden: 2 },
        { nivel_id: 5, titulo: 'Párrafos cortos', orden: 3 }
    ];

    lecciones.forEach(leccion => {
        db.runSync(
            'INSERT INTO lecciones (nivel_id, titulo, orden) VALUES (?, ?, ?)',
            [leccion.nivel_id, leccion.titulo, leccion.orden]
        );
    });

    console.log('✅ Lecciones insertadas');
}

// Inicializar la base de datos
export function initializeDatabase() {
    try {
        createTables();
        console.log('✅ Base de datos inicializada correctamente');
        return true;
    } catch (error) {
        console.error('❌ Error al inicializar la base de datos:', error);
        return false;
    }
}

// Exportar la conexión si necesitas usarla en otros módulos
export { db };