# Collectibol 3D - Procedural 3D Object Generator 🎨✨

React Native + Expo application that generates and visualizes procedural 3D objects using react-three/fiber.

## 🚀 Implemented Features

### Main Requirements ✅

1. **Basic 3D Setup**
   - ✅ PerspectiveCamera configured for optimal viewing
   - ✅ Lighting system: ambient light, directional light with shadows, point light
   - ✅ OrbitControls for touch navigation on mobile (pan, zoom, rotate)

2. **UI / CTA to Create Instances**
   - ✅ "Create Object" button that generates new 3D shapes in the scene
   - ✅ Available geometries: Box, Sphere, Torus, Cone, Cylinder
   - ✅ Real-time instance counter

3. **Procedural Variation**
   - ✅ Random color from a predefined palette (12 colors)
   - ✅ Random size (0.8 - 2.0)
   - ✅ Random position within a bounded area
   - ✅ Random rotation on all 3 axes
   - ✅ Random scale (70% uniform, 30% non-uniform)
   - ✅ Material properties: random metalness and roughness
   - ✅ Unique animation speed per instance

4. **Interactions**
   - ✅ Tap to select an instance and show its "object biology" in the console
   - ✅ Visual selection effect (increased scale + wireframe)
   - ✅ Entry animation with @react-spring/three (scale + opacity)
   - ✅ Continuous individual rotation per object

5. **Structure and State**
   - ✅ Zustand for global state management
   - ✅ TypeScript with full typing
   - ✅ Modular architecture: stores/, utils/, components/3d/

6. **Performance**
   - ✅ Optimized rendering with references and memoization
   - ✅ No heavy assets, only primitive geometries
   - ✅ Stable frame rate on mobile devices

### Bonus Exercises ⭐

7. **UI / CTA to Delete Instances** ✅
   - "Clear All" button that removes all instances
   - Resets state and clears the scene

8. **Custom Shaders (GLSL)** ✅
   - `ShaderObject` with custom material
   - **Vertex Shader**: Vertex displacement with wave effect
   - **Fragment Shader**: Animated gradient + Fresnel effect for glow
   - **Uniforms**:
     - `u_time`: Elapsed time for animations
     - `u_color`: Base color of the object (THREE.Color)
     - `u_pulseSpeed`: Pulse effect speed (2.0)
     - `u_pulseIntensity`: Displacement intensity (0.3)
   - Always visible in the background of the scene

9. **State Persistence** ✅
   - Zustand persist middleware + AsyncStorage
   - Created instances persist after closing/reopening the app
   - Full parameter recovery (id, color, geometry, transforms, etc.)

## 📦 Technologies Used

- **Expo SDK** (latest stable version)
- **Expo Router** (file-based routing)
- **React Native** with TypeScript
- **@react-three/fiber** (v9.5.0) - React renderer for Three.js
- **@react-three/drei** (v10.7.7) - Helpers for R3F
- **@react-spring/three** (v10.0.3) - Declarative animations
- **Zustand** (v5.0.10) - State management
- **AsyncStorage** (v2.2.0) - Local persistence
- **Three.js** (v0.182.0) - 3D engine

## 🛠️ Installation and Running

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator (macOS) or Android Emulator

### Steps to Run

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd collectibol-3d
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the application**

   ```bash
   npx expo start
   ```

4. **Run options**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan the QR with Expo Go (limited for 3D features)
   - **Recommended**: Use a development build for better 3D performance

## 🎮 How to Use

1. **Create objects**: Tap the "✨ Create Object" button to generate a new 3D object with random parameters
2. **Navigate the scene**:
   - Drag with one finger to rotate the camera
   - Pinch to zoom
   - Drag with two fingers to pan
3. **Select objects**: Tap any 3D object to see its "biology" in the console
4. **Clear scene**: Use the "🗑️ Clear All" button to remove all objects

## 📂 Project Structure

```
collectibol-3d/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Main screen with 3D scene
│   │   └── explore.tsx        # Info tab (original)
│   └── _layout.tsx            # Root layout
├── components/
│   └── 3d/
│       ├── scene-3d.tsx       # Canvas and scene setup
│       ├── object-3d.tsx      # Individual 3D object component
│       └── shader-object.tsx  # Object with custom shader
├── stores/
│   └── object-store.ts        # Zustand store with persistence
├── utils/
│   └── procedural-generator.ts # Procedural generation system
└── README.md
```

## 🎨 Procedural Generation System

The system generates objects with controlled random parameters:

```typescript
{
  type: 'box' | 'sphere' | 'torus' | 'cone' | 'cylinder',
  color: string,              // From a palette of 12 colors
  size: number,               // 0.8 - 2.0
  position: [x, y, z],        // Bounded area
  rotation: [rx, ry, rz],     // 0 - 2π radians
  scale: [sx, sy, sz],        // 0.5 - 1.5
  metalness: number,          // 0.1 - 0.9
  roughness: number,          // 0.1 - 0.8
  animationSpeed: number,     // 0.5 - 2.0
}
```

## 🎯 Key Features

- **Automatic persistence**: Objects are saved automatically when created/removed
- **Visual feedback**: Smooth entry animations with @react-spring
- **Intuitive selection**: Visual highlight when selecting objects
- **Console logging**: Detailed info for each object when selected
- **Shader demo**: Custom GLSL shader object always visible
- **Mobile optimization**: Designed to run smoothly on mobile devices

## 🐛 Troubleshooting

### The 3D scene does not render

- Make sure to use a development build or iOS Simulator/Android Emulator
- Expo Go has limitations with WebGL and may not work properly

### TypeScript errors

```bash
npm run tsc --noEmit
```

### Clear cache

```bash
npx expo start -c
```

## 📝 Development Notes

- The custom shader uses uniforms updated every frame for smooth animations
- Persistence uses JSON storage, compatible with the full data structure
- OrbitControls are configured with limits to prevent the camera from going below the plane
- Animations use `useFrame` for render loop synchronization

## 🚀 Next Improvements (Optional)

- [ ] Add more geometry types (complex compositions)
- [ ] Implement particle system
- [ ] Add procedural textures
- [ ] "Explosion" system to remove objects individually
- [ ] Post-processing effects (bloom, depth of field)
- [ ] VR/AR mode with expo-gl

---
