import React, { useMemo, useRef } from "react";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ShaderObjectProps {
  position: [number, number, number];
  size?: number;
  color?: string;
}

export const ShaderObject: React.FC<ShaderObjectProps> = ({
  position,
  size = 1.5,
  color = "#4ECDC4",
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Shader uniforms
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_color: { value: new THREE.Color(color) },
      u_pulseSpeed: { value: 2.0 },
      u_pulseIntensity: { value: 0.3 },
    }),
    [color],
  );

  // Vertex shader - adds wave displacement
  const vertexShader = `
    uniform float u_time;
    uniform float u_pulseIntensity;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vUv = uv;
      
      // Add wave displacement
      vec3 pos = position;
      float displacement = sin(pos.x * 2.0 + u_time) * 
                          cos(pos.y * 2.0 + u_time) * 
                          u_pulseIntensity;
      pos += normal * displacement;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  // Fragment shader - creates animated gradient and glow
  const fragmentShader = `
    uniform float u_time;
    uniform vec3 u_color;
    uniform float u_pulseSpeed;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    
    void main() {
      // Fresnel effect for edge glow
      vec3 viewDirection = normalize(cameraPosition - vPosition);
      float fresnel = pow(1.0 - dot(vNormal, viewDirection), 3.0);
      
      // Animated gradient based on position and time
      float gradient = sin(vPosition.y * 2.0 + u_time * u_pulseSpeed) * 0.5 + 0.5;
      
      // Pulse effect
      float pulse = sin(u_time * u_pulseSpeed) * 0.5 + 0.5;
      
      // Combine effects
      vec3 color1 = u_color;
      vec3 color2 = u_color * 0.5 + vec3(0.2, 0.3, 0.5);
      vec3 finalColor = mix(color1, color2, gradient);
      
      // Add fresnel glow
      finalColor += fresnel * vec3(0.3, 0.5, 1.0) * pulse;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  // Update uniforms on each frame
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    }

    // Slow rotation
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[size, 1]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
