import { Tabs } from 'expo-router';
import { Home, Heart } from 'lucide-react-native';
import { SavedProvider } from '../../context/SavedContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TabLayout() {
  return (
    // Wrapper necesario para gestos de swipe
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Provider que comparte estado entre todas las pantallas */}
      <SavedProvider>
        <Tabs
          screenOptions={{
            // Color del tab activo (azul)
            tabBarActiveTintColor: '#3B82F6',
            
            // Color del tab inactivo (gris)
            tabBarInactiveTintColor: '#94A3B8',
            
            // Ocultar header - usamos SafeAreaView en cada pantalla
            headerShown: false,
            
            // Estilo de la barra de tabs
            tabBarStyle: {
              backgroundColor: '#FFFFFF',
              borderTopWidth: 1,
              borderTopColor: '#E0E7FF', // Borde azul claro
              paddingTop: 8,
              height: 60,
            },
            
            // Estilo del label
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
            },
          }}
        >
          {/* Tab 1: Pantalla Home (index.tsx) */}
          <Tabs.Screen
            name="index"
            options={{
              title: 'Inicio',
              tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
            }}
          />
          
          {/* Tab 2: Pantalla Guardados (saved.tsx) */}
          <Tabs.Screen
            name="Guardado"  
            options={{
              title: 'Guardados',
              tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
            }}
          />
        </Tabs>
      </SavedProvider>
    </GestureHandlerRootView>
  );
}