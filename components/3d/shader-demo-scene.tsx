import React from "react";

import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

/* Components */
import { ShaderObject } from "./shader-object";

export const ShaderDemoScene: React.FC = () => {
  return (
    <Canvas style={{ flex: 1 }}>
      {/* Camera positioned to focus on shader object */}
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />

      {/* Lighting setup for shader visibility */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.0} />
      <pointLight position={[-5, 0, 0]} intensity={0.5} color="#4ECDC4" />
      <pointLight position={[5, 0, 0]} intensity={0.5} color="#FFA07A" />

      {/* Main Shader Object - centered and prominent */}
      <ShaderObject position={[0, 0, 0]} size={1.5} color="#4ECDC4" />

      {/* Background plane for depth perception */}
      <mesh position={[0, 0, -3]} rotation={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>

      {/* Interactive controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={10}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
};
