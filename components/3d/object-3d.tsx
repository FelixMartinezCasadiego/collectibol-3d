import React, { useRef } from "react";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* Stores */
import { type Object3DInstance, useObjectStore } from "@/stores/object-store";

interface Object3DProps {
  instance: Object3DInstance;
  onPress?: () => void;
}

export const Object3D: React.FC<Object3DProps> = React.memo(
  ({ instance, onPress }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const selectedId = useObjectStore((state) => state.selectedId);
    const isSelected = selectedId === instance.id;

    // Continuous rotation animation
    useFrame((state, delta) => {
      if (meshRef.current) {
        meshRef.current.rotation.x += delta * instance.animationSpeed * 0.3;
        meshRef.current.rotation.y += delta * instance.animationSpeed * 0.5;
      }
    });

    const renderGeometry = () => {
      const size = instance.size;

      switch (instance.type) {
        case "box":
          return <boxGeometry args={[size, size, size]} />;
        case "sphere":
          return <sphereGeometry args={[size * 0.5, 32, 32]} />;
        case "torus":
          return <torusGeometry args={[size * 0.5, size * 0.2, 16, 100]} />;
        case "cone":
          return <coneGeometry args={[size * 0.5, size, 32]} />;
        case "cylinder":
          return <cylinderGeometry args={[size * 0.5, size * 0.5, size, 32]} />;
        default:
          return <boxGeometry args={[size, size, size]} />;
      }
    };

    const handlePointerDown = (e: any) => {
      e.stopPropagation();
      if (onPress) {
        onPress();
      }
    };

    // Simple scale for selection (no animation)
    const finalScale = instance.scale.map(
      (s) => s * (isSelected ? 1.2 : 1),
    ) as [number, number, number];

    return (
      <>
        <mesh
          ref={meshRef}
          position={instance.position}
          rotation={instance.rotation}
          scale={finalScale}
          onPointerDown={handlePointerDown}
        >
          {renderGeometry()}
          <meshStandardMaterial
            color={instance.color}
            metalness={instance.metalness}
            roughness={instance.roughness}
            emissive={instance.color}
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Wireframe outline for better definition */}
        {isSelected && (
          <mesh
            position={instance.position}
            rotation={meshRef.current?.rotation || instance.rotation}
            scale={finalScale.map((s) => s * 1.05) as [number, number, number]}
          >
            {renderGeometry()}
            <meshBasicMaterial
              color="#ffffff"
              wireframe
              transparent
              opacity={0.5}
            />
          </mesh>
        )}
      </>
    );
  },
);
