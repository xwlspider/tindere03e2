import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * 📦 type(models): definición de la estructura de una foto guardada
 */
interface SavedPhoto {
  id: number;
  uri: string;
  timestamp: number;
}

/**
 * 📦 type(context): definición del tipo del contexto
 */
type SavedContextType = {
  savedPhotos: SavedPhoto[];
  addSavedPhoto: (uri: string) => void;
  clearSavedPhotos: () => void;
};

/**
 * 🔧 chore(context): creación del contexto con valor inicial undefined
 */
const SavedContext = createContext<SavedContextType | undefined>(undefined);

/**
 * ✨ feat(context): provider del contexto
 * 
 * Este componente envuelve la app y proporciona acceso al estado global.
 * Todos los componentes hijos podrán acceder a savedPhotos y sus funciones.
 * 
 * @param children - Componentes hijos que tendrán acceso al contexto
 */
export function SavedProvider({ children }: { children: ReactNode }) {
  // 🔧 chore(state): estado local que se compartirá globalmente
  const [savedPhotos, setSavedPhotos] = useState<SavedPhoto[]>([]);

  /**
   * ✨ feat(actions): agrega una nueva foto a la lista de guardados
   * 
   * @param uri - URI de la foto a guardar
   */
  const addSavedPhoto = (uri: string) => {
    // 🔧 chore(state): crear nuevo objeto de foto con ID único
    const newPhoto: SavedPhoto = {
      id: Date.now(), // Usar timestamp como ID único
      uri,
      timestamp: Date.now(),
    };
    
    // 🔧 chore(state): agregar foto al final del array
    setSavedPhotos((prev) => [...prev, newPhoto]);
  };

  /**
   * 🔥 chore(cleanup): limpia todas las fotos guardadas (reset)
   * 
   * Útil para el botón de reiniciar en la pantalla Home.
   */
  const clearSavedPhotos = () => {
    setSavedPhotos([]);
  };

  // 🔧 chore(provider): proporcionar el estado y funciones a componentes hijos
  return (
    <SavedContext.Provider value={{ savedPhotos, addSavedPhoto, clearSavedPhotos }}>
      {children}
    </SavedContext.Provider>
  );
}

/**
 * ✨ feat(hooks): hook personalizado para acceder al contexto
 * 
 * Simplifica el acceso al contexto en los componentes.
 * 
 * @example
 * ```tsx
 * const { savedPhotos, addSavedPhoto } = useSaved();
 * ```
 * 
 * @throws Error si se usa fuera del SavedProvider
 */
export function useSaved() {
  const context = useContext(SavedContext);
  
  // 🐛 fix(validation): validar que el hook esté dentro del Provider
  if (!context) {
    throw new Error('❌ useSaved debe usarse dentro de SavedProvider');
  }
  
  return context;
}

// 📤 export(types): exportar tipos para usar en otros archivos si es necesario
export type { SavedPhoto, SavedContextType };