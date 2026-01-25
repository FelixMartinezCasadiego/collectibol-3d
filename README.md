# Collectibol 3D - Procedural 3D Object Generator 🎨✨

## 📱 Running on Devices

See the documentation to run the app on your device:

- [How to run the app on iOS](documentation/run-app-ios.md)
- [How to run the app on an Android emulator](documentation/run-app-android-emulator.md)

React Native + Expo application that generates and visualizes procedural 3D objects using react-three/fiber.

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

---
