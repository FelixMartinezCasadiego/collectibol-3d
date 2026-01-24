import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type GeometryType = "box" | "sphere" | "torus" | "cone" | "cylinder";

export interface Object3DInstance {
  id: string;
  type: GeometryType;
  color: string;
  size: number;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  metalness: number;
  roughness: number;
  animationSpeed: number;
  createdAt: number;
}

interface ObjectStoreState {
  instances: Object3DInstance[];
  selectedId: string | null;
  addInstance: (instance: Object3DInstance) => void;
  removeInstance: (id: string) => void;
  clearAll: () => void;
  selectInstance: (id: string | null) => void;
  updateInstance: (id: string, updates: Partial<Object3DInstance>) => void;
}

export const useObjectStore = create<ObjectStoreState>()(
  persist(
    (set) => ({
      instances: [],
      selectedId: null,

      addInstance: (instance) =>
        set((state) => ({
          instances: [...state.instances, instance],
        })),

      removeInstance: (id) =>
        set((state) => ({
          instances: state.instances.filter((obj) => obj.id !== id),
          selectedId: state.selectedId === id ? null : state.selectedId,
        })),

      clearAll: () =>
        set({
          instances: [],
          selectedId: null,
        }),

      selectInstance: (id) =>
        set({
          selectedId: id,
        }),

      updateInstance: (id, updates) =>
        set((state) => ({
          instances: state.instances.map((obj) =>
            obj.id === id ? { ...obj, ...updates } : obj,
          ),
        })),
    }),
    {
      name: "collectibol-3d-storage",
      storage: createJSONStorage(() => AsyncStorage),
      skipHydration: false,
      partialize: (state) => ({
        instances: state.instances,
      }),
    },
  ),
);
