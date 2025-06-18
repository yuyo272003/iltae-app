// src/db/executeSql.ts
import { db } from "@/db/schema";

/**
 * Sustituye cada '?' por su valor en params,
 * escapando comillas en strings.
 */
function substituteParams(sql: string, params: any[]): string {
    let index = 0;
    return sql.replace(/\?/g, () => {
        const val = params[index++];
        if (typeof val === "number") {
            return String(val);
        }
        // Escapa apóstrofes y encierra en comillas
        return `'${String(val).replace(/'/g, "''")}'`;
    });
}

/**
 * Ejecuta una sentencia SQL sobre tu DB síncrona y devuelve filas.
 * @param sql   - SQL con placeholders '?'
 * @param params- parámetros para sustituir en los '?' (solo para sustitución)
 */
export function executeSql(sql: string, params: any[] = []): Promise<any[]> {
    return new Promise((resolve, reject) => {
        try {
            const isSelect = /^\s*select/i.test(sql);
            // Si hay params, interpolarlos en el SQL
            const sqlToExec = params.length ? substituteParams(sql, params) : sql;

            if (isSelect) {
                // execSync acepta solo el SQL como string
                // @ts-ignore
                const resultSets: { columns: string[]; values: any[][] }[] = db.execSync(sqlToExec);
                if (!resultSets || !resultSets.length) {
                    return resolve([]);
                }
                const { columns, values } = resultSets[0];
                // Mapea cada fila a un objeto { column: value }
                const rows = values.map(rowArr => {
                    const obj: any = {};
                    columns.forEach((col, idx) => {
                        obj[col] = rowArr[idx];
                    });
                    return obj;
                });
                return resolve(rows);
            } else {
                // DML (INSERT/UPDATE/DELETE)
                db.runSync(sql, params);
                return resolve([]);
            }
        } catch (error) {
            return reject(error);
        }
    });
}
