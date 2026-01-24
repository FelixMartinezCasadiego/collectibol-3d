/* Stores */
import {
  type GeometryType,
  type Object3DInstance,
} from "@/stores/object-store";

/**
 * Generates a random number between min and max
 */
export const randomRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Generates a random integer between min and max (inclusive)
 */
export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generates a random color in hex format
 */
export const randomColor = (): string => {
  const colors = [
    "#FF6B6B", // Red
    "#4ECDC4", // Cyan
    "#45B7D1", // Blue
    "#FFA07A", // Light Salmon
    "#98D8C8", // Mint
    "#F7DC6F", // Yellow
    "#BB8FCE", // Purple
    "#85C1E2", // Sky Blue
    "#F8B739", // Orange
    "#52B788", // Green
    "#E76F51", // Burnt Orange
    "#2A9D8F", // Teal
  ];
  return colors[randomInt(0, colors.length - 1)];
};

/**
 * Generates a random geometry type
 */
export const randomGeometry = (): GeometryType => {
  const types: GeometryType[] = ["box", "sphere", "torus", "cone", "cylinder"];
  return types[randomInt(0, types.length - 1)];
};

/**
 * Generates random position within a bounded area
 */
export const randomPosition = (): [number, number, number] => {
  return [randomRange(-3, 3), randomRange(0, 3), randomRange(-2, 2)];
};

/**
 * Generates random rotation in radians
 */
export const randomRotation = (): [number, number, number] => {
  return [
    randomRange(0, Math.PI * 2),
    randomRange(0, Math.PI * 2),
    randomRange(0, Math.PI * 2),
  ];
};

/**
 * Generates random scale (size variation)
 */
export const randomScale = (): [number, number, number] => {
  const uniformScale = randomRange(0.5, 1.5);
  // 70% chance of uniform scale, 30% chance of non-uniform
  if (Math.random() < 0.7) {
    return [uniformScale, uniformScale, uniformScale];
  }
  return [randomRange(0.5, 1.5), randomRange(0.5, 1.5), randomRange(0.5, 1.5)];
};

/**
 * Generates a complete procedural 3D object instance
 */
export const generateProceduralObject = (): Omit<
  Object3DInstance,
  "id" | "createdAt"
> => {
  return {
    type: randomGeometry(),
    color: randomColor(),
    size: randomRange(0.8, 2.0),
    position: randomPosition(),
    rotation: randomRotation(),
    scale: randomScale(),
    metalness: randomRange(0.1, 0.9),
    roughness: randomRange(0.1, 0.8),
    animationSpeed: randomRange(0.5, 2.0),
  };
};

/**
 * Creates a complete Object3DInstance with unique ID
 */
export const createObject3DInstance = (): Object3DInstance => {
  return {
    id: `obj-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    ...generateProceduralObject(),
    createdAt: Date.now(),
  };
};
