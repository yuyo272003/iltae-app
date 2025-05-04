import { useState, useEffect } from 'react';
import { usePathname } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook personalizado para gestionar el progreso de navegación en pantallas.
 * Guarda automáticamente la ruta actual para la lección especificada.
 * 
 * @param leccionId - Identificador único de la lección actual
 * @returns Estado que indica si el componente está listo para renderizarse
 */
export function useScreenProgress(leccionId: string): boolean {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState<boolean>(false);
  
  useEffect(() => {
    const saveProgress = async (): Promise<void> => {
      try {
        // Solo guardamos si estamos en una pantalla de lección
        // Verifica que la ruta contiene el patrón de una pantalla de lección
        if (pathname.includes(`/nivel2/${leccionId}/`)) {
          // Guardamos en una key específica para cada lección
          const progresoKey = `progreso_nivel2_${leccionId}`;
          await AsyncStorage.setItem(progresoKey, pathname);
          console.log(`📝 Guardando progreso de ${leccionId}:`, pathname);
        } else {
          console.log(`⚠️ No guardando progreso para ${pathname} porque no es pantalla de lección`);
        }
      } catch (error) {
        console.error('Error al guardar progreso:', error);
      }
    };
    
    // Solo guardamos después de que la pantalla esté lista
    if (isReady) {
      saveProgress();
    }
  }, [isReady, pathname, leccionId]);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return isReady;
}