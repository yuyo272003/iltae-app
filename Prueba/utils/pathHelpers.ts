/**
 * Extrae el ID de lección del pathname de la ruta actual
 * El formato esperado es: /(tabs)/niveles/nivelX/leccionY/...
 * 
 * @param pathname - La ruta completa actual 
 * @returns El ID de la lección (por ejemplo, 'leccion1')
 */
export function getLeccionIdFromPath(pathname: string): string {
    // Expresión regular para capturar el ID de lección del formato /(tabs)/niveles/nivelX/leccionY/...
    const match = pathname.match(/\/niveles\/nivel\d+\/(leccion\d+)/);
    
    if (match && match[1]) {
      return match[1]; // Devuelve 'leccionY'
    }
    
    // Si no se encuentra el patrón o para rutas de prueba, intentamos extraer solo el nombre de la lección
    const simpleMatch = pathname.match(/(leccion\d+)/);
    if (simpleMatch && simpleMatch[1]) {
      return simpleMatch[1];
    }
    
    // Si no podemos extraer el ID, devolvemos un valor predeterminado
    console.warn(`⚠️ No se pudo extraer ID de lección de: ${pathname}`);
    
    // Extraer cualquier número de la URL como respaldo
    const numberMatch = pathname.match(/(\d+)/);
    if (numberMatch && numberMatch[1]) {
      return `leccion${numberMatch[1]}`;
    }
    
    return 'leccion1'; // Valor predeterminado
  }