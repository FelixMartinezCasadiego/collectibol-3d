import React, { useEffect, useState } from "react";

import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

/* Components */
import { Object3D } from "./object-3d";
/* Stores */
import { useObjectStore } from "@/stores/object-store";

// Camera zoom controller
function CameraController({ zoomDelta }: { zoomDelta: number }) {
  const { camera } = useThree();

  useEffect(() => {
    if (zoomDelta !== 0) {
      const newZ = Math.max(5, Math.min(30, camera.position.z + zoomDelta));
      camera.position.z = newZ;
    }
  }, [zoomDelta, camera]);

  return null;
}

export const Scene3D: React.FC = () => {
  const instances = useObjectStore((state) => state.instances);
  const selectInstance = useObjectStore((state) => state.selectInstance);

  const [zoomDelta, setZoomDelta] = useState(0);

  const handleZoomIn = () => {
    setZoomDelta((prev) => prev - 2);
    setTimeout(() => setZoomDelta(0), 50);
  };

  const handleZoomOut = () => {
    setZoomDelta((prev) => prev + 2);
    setTimeout(() => setZoomDelta(0), 50);
  };

  // Log instances to debug
  useEffect(() => {
    console.log("Scene3D instances updated:", instances.length);
  }, [instances]);

  const handleObjectPress = React.useCallback(
    (id: string) => {
      const instance = instances.find((obj) => obj.id === id);
      if (instance) {
        console.log("=== Object Biology ===");
        console.log("ID:", instance.id);
        console.log("Type:", instance.type);
        console.log("Color:", instance.color);
        console.log("Size:", instance.size);
        console.log("Position:", instance.position);
        console.log("Rotation:", instance.rotation);
        console.log("Scale:", instance.scale);
        console.log("Metalness:", instance.metalness);
        console.log("Roughness:", instance.roughness);
        console.log("Animation Speed:", instance.animationSpeed);
        console.log(
          "Created At:",
          new Date(instance.createdAt).toLocaleString(),
        );
        console.log("====================");

        selectInstance(id);
      }
    },
    [instances, selectInstance],
  );

  return (
    <View style={{ flex: 1 }}>
      <Canvas style={{ flex: 1 }}>
        <CameraController zoomDelta={zoomDelta} />
        {/* Camera */}
        <PerspectiveCamera makeDefault position={[0, 4, 12]} fov={50} />

        {/* Lights - Increased for better visibility */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 5]} intensity={2.0} />
        <directionalLight
          position={[-5, 5, 5]}
          intensity={0.8}
          color="#ffffff"
        />
        <pointLight position={[-10, 5, -5]} intensity={0.7} color="#4ECDC4" />
        <pointLight position={[10, 5, 5]} intensity={0.5} color="#FFA07A" />

        {/* 3D Objects */}
        {instances.map((instance) => {
          console.log("Rendering object:", instance.id, instance.type);
          return (
            <Object3D
              key={instance.id}
              instance={instance}
              onPress={() => handleObjectPress(instance.id)}
            />
          );
        })}

        {/* Ground plane for reference */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>

        {/* Grid helper visual - more visible */}
        <gridHelper
          args={[20, 20, "#555555", "#2a2a2a"]}
          position={[0, -2.99, 0]}
        />

        {/* Controls - rotation only (zoom disabled due to expo-gl bug) */}
        <OrbitControls
          makeDefault
          enableZoom={false}
          enableRotate={true}
          enablePan={false}
          minDistance={5}
          maxDistance={30}
        />
      </Canvas>

      {/* Zoom Controls */}
      <View style={styles.zoomControls}>
        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
          <Text style={styles.zoomButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
          <Text style={styles.zoomButtonText}>−</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  zoomControls: {
    position: "absolute",
    right: 20,
    top: 60,
    gap: 10,
  },
  zoomButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  zoomButtonText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
});
