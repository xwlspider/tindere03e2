//SavedScreen: Pantalla de galería de fotos guardadas
import React from 'react';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera } from 'lucide-react-native';
import { useSaved, SavedPhoto } from '../../context/SavedContext';

/**
 * Pantalla de fotos guardadas en grid de 2 columnas
 * 
 * Lee las fotos del contexto global y las muestra en una galería.
 * Si no hay fotos, muestra un mensaje amigable.
 */
export default function SavedScreen() {
  // Obtener fotos guardadas del contexto
  const { savedPhotos } = useSaved();

  // Renderizar cada foto del grid
  const renderItem = ({ item }: { item: SavedPhoto }) => {
    return (
      <View style={styles.card}>
        <Image 
          source={{ uri: item.uri }} 
          style={styles.photo}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con título y contador */}
      <View style={styles.header}>
        <Text style={styles.title}>Ftos guardadas</Text>
        <Text style={styles.subtitle}>{savedPhotos.length} fotos guardadas</Text>
      </View>

      {/* Estado vacío o grid de fotos */}
      {savedPhotos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Camera size={80} color="#93C5FD" strokeWidth={1} />
          <Text style={styles.emptyText}>Hora de empezar no?</Text>
          <Text style={styles.emptySubtext}>
            Toma una foto y desliza a la izquierda para guardarla
          </Text>
        </View>
      ) : (
        // Grid de 2 columnas tipo galería
        <FlatList
          data={savedPhotos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(99, 102, 241, 0.08)',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#6366F1',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#94A3B8',
    marginTop: 6,
    fontWeight: '500',
  },
  
  // Estilos para pantalla vacía
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#6366F1',
    marginTop: 24,
    letterSpacing: -0.3,
  },
  emptySubtext: {
    fontSize: 15,
    color: '#CBD5E1',
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 22,
  },
  
  // Estilos para el grid de fotos
  grid: {
    padding: 20,
    paddingBottom: 40,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    aspectRatio: 0.75,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    marginHorizontal: 6,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.1)',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
});