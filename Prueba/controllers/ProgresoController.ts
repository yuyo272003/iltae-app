import { executeSql } from "@/db/executeSql";

export class ProgresoController {
    // Registrar lección completada y actualizar porcentaje y niveles completados
    static async actualizarProgreso(requestBody: {
        usuario_id?: number;
        leccion_id?: number;
    }) {
        try {
            const { usuario_id, leccion_id } = requestBody;

            if (!usuario_id || !leccion_id) {
                return { status: 422, json: { message: 'Faltan datos' } };
            }

            // Obtener lección
            const lecciones = await executeSql('SELECT * FROM lecciones WHERE id = ? LIMIT 1', [
                leccion_id,
            ]);
            if (!lecciones.length) {
                return { status: 422, json: { message: 'Lección no encontrada' } };
            }
            const nivel_id = lecciones[0].nivel_id;

            // Verificar si progreso ya existe
            const existentes = await executeSql('SELECT * FROM progreso WHERE usuario_id = ? AND leccion_id = ?', [usuario_id, leccion_id]);
            if (existentes.length) {
                return {
                    status: 200,
                    json: {
                        message: 'Esta lección ya fue registrada previamente.',
                        progreso: existentes[0],
                    },
                };
            }

            // Crear nuevo progreso
            await executeSql(`INSERT INTO progreso (usuario_id, nivel_id, leccion_id, porcentaje, niveles_completados, created_at, updated_at)
     VALUES (?, ?, ?, 0, 0, datetime('now'), datetime('now'))`, [usuario_id, nivel_id, leccion_id]);

            // Recalcular porcentaje
            const porcentaje = await this.calcularProgresoNivel(usuario_id, nivel_id);

            // Actualizar porcentaje en todos los progresos de este nivel para el usuario
            await executeSql('UPDATE progreso SET porcentaje = ? WHERE usuario_id = ? AND nivel_id = ?', [porcentaje, usuario_id, nivel_id]);

            // Actualizar niveles completados si porcentaje es 100%
            if (porcentaje === 100) {
                await this.actualizarConteoNivelesCompletados(usuario_id);
            }

            return {
                status: 200,
                json: {
                    message: 'Progreso actualizado correctamente',
                    porcentaje: Math.round(porcentaje * 100) / 100,
                    nivel_id,
                },
            };
        } catch (error) {
            return { status: 500, json: { message: 'Error interno', error } };
        }
    }

    // Calcular porcentaje de progreso en un nivel
    static async calcularProgresoNivel(usuario_id: number, nivel_id: number): Promise<number> {
        const totalRes = await executeSql('SELECT COUNT(*) as total FROM lecciones WHERE nivel_id = ?', [
            nivel_id,
        ]);
        const totalLecciones = totalRes[0]?.total || 0;

        const completadasRes = await executeSql(`SELECT COUNT(DISTINCT leccion_id) as completadas
   FROM progreso WHERE usuario_id = ? AND nivel_id = ?`, [usuario_id, nivel_id]);
        const leccionesCompletadas = completadasRes[0]?.completadas || 0;

        return totalLecciones > 0 ? (leccionesCompletadas / totalLecciones) * 100 : 0;
    }

    // Actualizar conteo de niveles completados para usuario
    static async actualizarConteoNivelesCompletados(usuario_id: number) {
        const nivelesCompletadosRes = await executeSql(`SELECT COUNT(DISTINCT nivel_id) as completos FROM progreso WHERE usuario_id = ? AND porcentaje = 100`, [usuario_id]);
        const nivelesCompletados = nivelesCompletadosRes[0]?.completos || 0;

        await executeSql('UPDATE progreso SET niveles_completados = ? WHERE usuario_id = ?', [
            nivelesCompletados,
            usuario_id,
        ]);
    }

    // Devuelve resumen de progreso por nivel para un usuario
    static async obtenerProgresoPorNivel(usuario_id: number) {
        const niveles = await executeSql('SELECT * FROM niveles', []);
        const resumen = [];

        for (const nivel of niveles) {
            // Obtener lecciones por nivel
            const lecciones = await executeSql('SELECT * FROM lecciones WHERE nivel_id = ?', [
                nivel.id,
            ]);

            const porcentaje = await this.calcularProgresoNivel(usuario_id, nivel.id);

            resumen.push({
                nivel_id: nivel.id,
                nombre: nivel.nombre,
                porcentaje: Math.round(porcentaje * 100) / 100,
                total_lecciones: lecciones.length,
            });
        }

        return { status: 200, json: resumen };
    }

    // Ver progreso (niveles completados) del usuario
    static async verProgreso(usuario_id: number) {
        const progresos = await executeSql('SELECT * FROM progreso WHERE usuario_id = ? ORDER BY id DESC LIMIT 1', [
            usuario_id,
        ]);
        const progreso = progresos.length ? progresos[0] : null;

        return {
            status: 200,
            json: {
                niveles_completados: progreso?.niveles_completados || 0,
            },
        };
    }

    // Obtener la lección más reciente que el usuario completó
    static async obtenerLeccionId(usuario_id: number | undefined) {
        const progresos = await executeSql('SELECT * FROM progreso WHERE usuario_id = ? ORDER BY id DESC LIMIT 1', [usuario_id]);
        const progreso = progresos.length ? progresos[0] : null;

        return {
            status: 200,
            json: {
                leccion_id: progreso ? progreso.leccion_id : 1,
            },
        };
    }

    // Obtener niveles completados del usuario
    static async obtenerNivelesCompletados(usuario_id: number | undefined) {
        const progresos = await executeSql('SELECT * FROM progreso WHERE usuario_id = ? ORDER BY id DESC LIMIT 1', [usuario_id]);
        const progreso = progresos.length ? progresos[0] : null;

        return {
            status: 200,
            json: {
                niveles_completados: progreso?.niveles_completados || 0,
            },
        };
    }

    // Función general para avanzar en lecciones (parámetros nivel y lección)
    static async avanzarLeccion(
        usuario_id: number,
        nivelPantalla: number,
        leccionPantalla: number
    ) {
        try {
            // Buscar último progreso o crear uno nuevo
            const progresos = await executeSql('SELECT * FROM progreso WHERE usuario_id = ? ORDER BY id DESC LIMIT 1', [usuario_id]);
            let progreso = progresos.length ? progresos[0] : null;

            if (!progreso) {
                // Crear progreso nuevo inicial
                await executeSql(`INSERT INTO progreso (usuario_id, nivel_id, leccion_id, porcentaje, niveles_completados, created_at, updated_at)
      VALUES (?, ?, ?, 0, 0, datetime('now'), datetime('now'))`, [usuario_id, nivelPantalla, leccionPantalla]);
                progreso = {
                    usuario_id,
                    nivel_id: nivelPantalla,
                    leccion_id: leccionPantalla,
                    porcentaje: 0,
                    niveles_completados: 0,
                };
            }

            // No avanzar si ya pasó esta pantalla
            if (
                progreso.nivel_id > nivelPantalla ||
                (progreso.nivel_id === nivelPantalla && progreso.leccion_id > leccionPantalla)
            ) {
                return {
                    status: 200,
                    json: {
                        message: 'Esta pantalla ya fue superada. No se modificó el progreso.',
                        repeticion: true,
                    },
                };
            }

            // Obtener orden actual
            const ordenActualRes = await executeSql('SELECT orden FROM lecciones WHERE nivel_id = ? AND id = ? LIMIT 1', [nivelPantalla, leccionPantalla]);
            const ordenActual = ordenActualRes.length ? ordenActualRes[0].orden : 1;

            // Buscar siguiente lección en el mismo nivel
            let siguiente = await executeSql('SELECT * FROM lecciones WHERE nivel_id = ? AND orden > ? ORDER BY orden LIMIT 1', [nivelPantalla, ordenActual]);

            if (!siguiente.length) {
                // No hay más lecciones en este nivel, pasar al siguiente nivel
                siguiente = await executeSql('SELECT * FROM lecciones WHERE nivel_id = ? ORDER BY orden LIMIT 1', [nivelPantalla + 1]);

                if (siguiente.length) {
                    // Aumentar niveles completados
                    await this.incrementarNivelesCompletados(usuario_id);
                }
            }

            if (!siguiente.length) {
                // Ya terminó todo el contenido
                return {
                    status: 200,
                    json: {
                        message: 'Ya completaste todas las lecciones disponibles.',
                        finalizado: true,
                    },
                };
            }

            const siguienteLeccion = siguiente[0];

            // Calcular porcentaje
            const totalLeccionesRes = await executeSql('SELECT COUNT(*) as total FROM lecciones WHERE nivel_id = ?', [siguienteLeccion.nivel_id]);
            const totalLecciones = totalLeccionesRes[0]?.total || 1;
            const porcentaje = Math.round(((siguienteLeccion.orden - 1) / totalLecciones) * 10000) / 100;

            // Actualizar progreso
            await executeSql(`UPDATE progreso SET nivel_id = ?, leccion_id = ?, porcentaje = ?, updated_at = datetime('now')
     WHERE usuario_id = ?`, [siguienteLeccion.nivel_id, siguienteLeccion.id, porcentaje, usuario_id]);

            return {
                status: 200,
                json: {
                    message: 'Progreso actualizado correctamente',
                    nivel_id: siguienteLeccion.nivel_id,
                    leccion_id: siguienteLeccion.id,
                    porcentaje,
                    niveles_completados: progreso.niveles_completados || 0,
                    finalizado: false,
                },
            };
        } catch (error) {
            return { status: 500, json: { message: 'Error interno', error } };
        }
    }

    // Incrementa niveles completados en progreso para usuario
    static async incrementarNivelesCompletados(usuario_id: number) {
        const progresos = await executeSql('SELECT niveles_completados FROM progreso WHERE usuario_id = ? ORDER BY id DESC LIMIT 1', [usuario_id]);
        const actuales = progresos.length ? progresos[0].niveles_completados || 0 : 0;
        const nuevos = actuales + 1;

        await executeSql('UPDATE progreso SET niveles_completados = ? WHERE usuario_id = ?', [nuevos, usuario_id]);
    }

    // Métodos específicos para avanzar a lecciones con parámetros fijos (igual que en PHP)
    static avanzarLeccion1(usuario_id: number) {
        return this.avanzarLeccion(usuario_id, 1, 1);
    }
    static avanzarLeccion2(usuario_id: number) {
        return this.avanzarLeccion(usuario_id, 1, 2);
    }
    static avanzarLeccion3(usuario_id: number) {
        return this.avanzarLeccion(usuario_id, 1, 3);
    }
    static avanzarLeccion4(usuario_id: number) {
        return this.avanzarLeccion(usuario_id, 1, 4);
    }
    static avanzarLeccion5(usuario_id: number) {
        return this.avanzarLeccion(usuario_id, 1, 5);
    }
    static avanzarLeccion6(usuario_id: number) {
        return this.avanzarLeccion(usuario_id, 1, 6);
    }
    static avanzarLeccion7(usuario_id: number) {
        return this.avanzarLeccion(usuario_id, 2, 7);
    }
    static avanzarLeccion8(usuario_id: number) {
        return this.avanzarLeccion(usuario_id, 2, 8);
    }
    static avanzarLeccion9(usuario_id: number) {
        return this.avanzarLeccion(usuario_id, 2, 9);
    }
    static avanzarLeccion10(usuario_id: number) {
        return this.avanzarLeccion(usuario_id, 3, 10);
    }
    static avanzarLeccion11(usuario_id: number) {
        return this.avanzarLeccion(usuario_id, 3, 11);
    }
    static avanzarLeccion12(usuario_id: number) {
        return this.avanzarLeccion(usuario_id, 3, 12);
    }
    static avanzarLeccion13(usuario_id: number) {
        return this.avanzarLeccion(usuario_id, 4, 13);
    }
    static avanzarLeccion14(usuario_id: number) {
        return this.avanzarLeccion(usuario_id, 4, 14);
    }
    static avanzarLeccion15(usuario_id: number) {
        return this.avanzarLeccion(usuario_id, 4, 15);
    }
    static avanzarLeccion16(usuario_id: number) {
        return this.avanzarLeccion(usuario_id, 4, 16);
    }
    static avanzarLeccion17(usuario_id: number) {
        return this.avanzarLeccion(usuario_id, 4, 17);
    }
    static avanzarLeccion18(usuario_id: number) {
        return this.avanzarLeccion(usuario_id, 5, 18);
    }
    static avanzarLeccion19(usuario_id: number) {
        return this.avanzarLeccion(usuario_id, 5, 19);
    }
    static avanzarLeccion20(usuario_id: number) {
        return this.avanzarLeccion(usuario_id, 5, 20);
    }

}
