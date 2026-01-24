# Collectibol 3D - Procedural 3D Object Generator 🎨✨

Aplicación React Native + Expo que genera y visualiza objetos 3D procedurales usando react-three/fiber.

## 🚀 Características Implementadas

### Requisitos Principales ✅

1. **Set-up 3D básico**
   - ✅ Cámara PerspectiveCamera configurada para visualización óptima
   - ✅ Sistema de iluminación: ambient light, directional light con sombras, point light
   - ✅ OrbitControls para navegación táctil en móvil (pan, zoom, rotate)

2. **UI / CTA para crear instancias**
   - ✅ Botón "Create Object" que genera nuevas formas 3D en la escena
   - ✅ Geometrías disponibles: Box, Sphere, Torus, Cone, Cylinder
   - ✅ Contador de instancias en tiempo real

3. **Variación procedural**
   - ✅ Color aleatorio de paleta predefinida (12 colores)
   - ✅ Tamaño aleatorio (0.8 - 2.0)
   - ✅ Posición aleatoria en área delimitada
   - ✅ Rotación aleatoria en los 3 ejes
   - ✅ Escala aleatoria (uniforme 70%, no-uniforme 30%)
   - ✅ Propiedades de material: metalness y roughness aleatorios
   - ✅ Velocidad de animación única por instancia

4. **Interacciones**
   - ✅ Tap para seleccionar instancia y mostrar "biología del objeto" en consola
   - ✅ Efecto visual de selección (escala aumentada + wireframe)
   - ✅ Animación de entrada con @react-spring/three (scale + opacity)
   - ✅ Rotación continua individual por objeto

5. **Estructura y estado**
   - ✅ Zustand para gestión global de estado
   - ✅ TypeScript con tipado completo
   - ✅ Arquitectura modular: stores/, utils/, components/3d/

6. **Rendimiento**
   - ✅ Renderizado optimizado con referencias y memoización
   - ✅ Sin assets pesados, solo geometrías primitivas
   - ✅ Frame rate estable en dispositivos móviles

### Ejercicios Bonus ⭐

7. **UI / CTA para borrar instancias** ✅
   - Botón "Clear All" que elimina todas las instancias
   - Resetea el estado y limpia la escena

8. **Shaders personalizados (GLSL)** ✅
   - `ShaderObject` con material customizado
   - **Vertex Shader**: Desplazamiento de vértices con efecto wave
   - **Fragment Shader**: Gradiente animado + efecto Fresnel para glow
   - **Uniforms**:
     - `u_time`: Tiempo transcurrido para animaciones
     - `u_color`: Color base del objeto (THREE.Color)
     - `u_pulseSpeed`: Velocidad del efecto pulse (2.0)
     - `u_pulseIntensity`: Intensidad del desplazamiento (0.3)
   - Visible constantemente en el fondo de la escena

9. **Persistencia de estado** ✅
   - Zustand persist middleware + AsyncStorage
   - Las instancias creadas persisten al cerrar/reabrir la app
   - Recuperación completa de parámetros (id, color, geometría, transforms, etc.)

## 📦 Tecnologías Utilizadas

- **Expo SDK** (última versión estable)
- **Expo Router** (file-based routing)
- **React Native** con TypeScript
- **@react-three/fiber** (v9.5.0) - React renderer para Three.js
- **@react-three/drei** (v10.7.7) - Helpers para R3F
- **@react-spring/three** (v10.0.3) - Animaciones declarativas
- **Zustand** (v5.0.10) - State management
- **AsyncStorage** (v2.2.0) - Persistencia local
- **Three.js** (v0.182.0) - Motor 3D

## 🛠️ Instalación y Ejecución

### Requisitos previos

- Node.js 18+
- npm o yarn
- Expo CLI
- iOS Simulator (macOS) o Android Emulator

### Pasos para ejecutar

1. **Clonar el repositorio**

   ```bash
   git clone <repository-url>
   cd collectibol-3d
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Iniciar la aplicación**

   ```bash
   npx expo start
   ```

4. **Opciones de ejecución**
   - Presiona `i` para iOS Simulator
   - Presiona `a` para Android Emulator
   - Escanea el QR con Expo Go (limitado para funcionalidades 3D)
   - **Recomendado**: Usar development build para mejor rendimiento 3D

## 🎮 Cómo Usar

1. **Crear objetos**: Toca el botón "✨ Create Object" para generar un nuevo objeto 3D con parámetros aleatorios
2. **Navegar la escena**:
   - Arrastra con un dedo para rotar la cámara
   - Pellizca para hacer zoom
   - Arrastra con dos dedos para hacer pan
3. **Seleccionar objetos**: Toca cualquier objeto 3D para ver su "biología" en la consola
4. **Limpiar escena**: Usa el botón "🗑️ Clear All" para eliminar todos los objetos

## 📂 Estructura del Proyecto

```
collectibol-3d/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Pantalla principal con escena 3D
│   │   └── explore.tsx         # Tab info (original)
│   └── _layout.tsx             # Root layout
├── components/
│   └── 3d/
│       ├── scene-3d.tsx        # Canvas y configuración de escena
│       ├── object-3d.tsx       # Componente de objeto 3D individual
│       └── shader-object.tsx   # Objeto con shader personalizado
├── stores/
│   └── object-store.ts         # Zustand store con persistencia
├── utils/
│   └── procedural-generator.ts # Sistema de generación procedural
└── README.md
```

## 🎨 Sistema de Generación Procedural

El sistema genera objetos con parámetros aleatorios controlados:

```typescript
{
  type: 'box' | 'sphere' | 'torus' | 'cone' | 'cylinder',
  color: string,              // De paleta de 12 colores
  size: number,               // 0.8 - 2.0
  position: [x, y, z],        // Área delimitada
  rotation: [rx, ry, rz],     // 0 - 2π radianes
  scale: [sx, sy, sz],        // 0.5 - 1.5
  metalness: number,          // 0.1 - 0.9
  roughness: number,          // 0.1 - 0.8
  animationSpeed: number,     // 0.5 - 2.0
}
```

## 🎯 Características Destacadas

- **Persistencia automática**: Los objetos se guardan automáticamente al crearlos/eliminarlos
- **Feedback visual**: Animaciones de entrada suaves con @react-spring
- **Selección intuitiva**: Highlight visual al seleccionar objetos
- **Console logging**: Información detallada de cada objeto al seleccionarlo
- **Shader demo**: Objeto con shader GLSL customizado siempre visible
- **Optimización móvil**: Diseñado para funcionar fluidamente en dispositivos móviles

## 🐛 Troubleshooting

### La escena 3D no se renderiza

- Asegúrate de usar un development build o iOS Simulator/Android Emulator
- Expo Go tiene limitaciones con WebGL y puede no funcionar correctamente

### Errores de tipo TypeScript

```bash
npm run tsc --noEmit
```

### Limpiar caché

```bash
npx expo start -c
```

## 📝 Notas de Desarrollo

- El shader personalizado usa uniforms que se actualizan cada frame para animaciones fluidas
- La persistencia usa JSON storage, compatible con toda la estructura de datos
- OrbitControls está configurado con límites para evitar que la cámara pase por debajo del plano
- Las animaciones usan `useFrame` para sincronización con el render loop

## 🚀 Próximas Mejoras (Opcionales)

- [ ] Añadir más tipos de geometrías (composiciones complejas)
- [ ] Implementar sistema de partículas
- [ ] Añadir texturas procedurales
- [ ] Sistema de "explosión" para eliminar objetos individualmente
- [ ] Post-processing effects (bloom, depth of field)
- [ ] Modo VR/AR con expo-gl

---
