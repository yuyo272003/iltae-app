// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { AuthProvider } from '@/contexts/AuthContext'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'
// Importa directamente desde tu schema donde tienes createTables y seedDatabase
import { createTables, seedDatabase } from '@/db/schema'

// Evita que el splash se oculte hasta que carguen assets + BD
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  // 1) Al montar el layout, crea las tablas y ejecuta el seed
  useEffect(() => {
    try {
      createTables()
      seedDatabase()
      console.log('✓ BD lista')
    } catch (e) {
      console.warn('Error inicializando BD', e)
    }
  }, [])

  // 2) Cuando terminen de cargar las fuentes, ocultamos el splash
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  // Mientras las fuentes (y el splash) no estén listos, no renderizamos nada
  if (!loaded) {
    return null
  }

  return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </AuthProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
  )
}
