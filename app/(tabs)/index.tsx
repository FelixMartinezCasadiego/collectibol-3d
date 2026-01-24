import { Scene3D } from "@/components/3d/scene-3d";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useObjectStore } from "@/stores/object-store";
import { createObject3DInstance } from "@/utils/procedural-generator";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [isCreating, setIsCreating] = React.useState(false);
  const addInstance = useObjectStore((state) => state.addInstance);
  const clearAll = useObjectStore((state) => state.clearAll);
  const instances = useObjectStore((state) => state.instances);
  const colorScheme = useColorScheme();

  const handleCreateObject = React.useCallback(() => {
    setIsCreating(true);

    // Create object immediately
    const newObject = createObject3DInstance();
    addInstance(newObject);
    console.log("✨ New object created:", newObject.type);

    // Quick visual feedback
    setTimeout(() => {
      setIsCreating(false);
    }, 300);
  }, [addInstance]);

  const handleClearAll = React.useCallback(() => {
    clearAll();
    console.log("🗑️ All objects cleared");
  }, [clearAll]);

  const isDark = colorScheme === "dark";
  const backgroundColor = isDark ? "#000" : "#fff";
  const textColor = isDark ? "#fff" : "#000";
  const buttonBg = isDark ? "#333" : "#007AFF";
  const dangerBg = isDark ? "#8B0000" : "#FF3B30";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* 3D Scene */}
      <View style={styles.sceneContainer}>
        <Scene3D />
      </View>

      {/* UI Controls */}
      <View style={styles.controlsContainer}>
        <View style={styles.infoContainer}>
          <Text style={[styles.infoText, { color: "#4ECDC4" }]}>
            Objects: {instances.length}
          </Text>
          <Text style={[styles.hintText, { color: "#4ECDC4", opacity: 0.9 }]}>
            Tap objects to see their biology in console
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: buttonBg },
              isCreating && styles.disabledButton,
            ]}
            onPress={handleCreateObject}
            activeOpacity={0.7}
            disabled={isCreating}
          >
            <Text style={styles.buttonText}>✨ Create Object</Text>
          </TouchableOpacity>

          {instances.length > 0 && (
            <TouchableOpacity
              style={[
                styles.button,
                styles.dangerButton,
                { backgroundColor: dangerBg },
                isCreating && styles.disabledButton,
              ]}
              onPress={handleClearAll}
              activeOpacity={0.7}
              disabled={isCreating}
            >
              <Text style={styles.buttonText}>🗑️ Clear All</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Loading Overlay */}
      {isCreating && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4ECDC4" />
            <Text style={styles.loadingText}>Creating object...</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sceneContainer: {
    flex: 1,
  },
  controlsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
  },
  infoContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  hintText: {
    fontSize: 12,
    textAlign: "center",
  },
  buttonsContainer: {
    gap: 12,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dangerButton: {
    // Specific danger button styles
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.5,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  loadingContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: 32,
    borderRadius: 16,
    alignItems: "center",
    gap: 16,
    backdropFilter: "blur(10px)",
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
