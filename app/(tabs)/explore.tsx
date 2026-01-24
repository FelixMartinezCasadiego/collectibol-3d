import { ShaderDemoScene } from "@/components/3d/shader-demo-scene";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark ? "#000" : "#fff";
  const textColor = isDark ? "#fff" : "#000";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* 3D Shader Demo */}
      <View style={styles.sceneContainer}>
        <ShaderDemoScene />
      </View>

      {/* Info Panel */}
      <ScrollView
        style={styles.infoPanel}
        contentContainerStyle={styles.infoPanelContent}
      >
        <Text style={[styles.title, { color: textColor }]}>
          🎨 Custom GLSL Shader Demo
        </Text>

        <Text style={[styles.subtitle, { color: textColor }]}>
          Bonus Feature #8
        </Text>

        <Text style={[styles.description, { color: textColor, opacity: 0.8 }]}>
          This icosahedron demonstrates a custom shader material with:
        </Text>

        <View style={styles.featuresList}>
          <Text style={[styles.feature, { color: textColor }]}>
            • <Text style={styles.bold}>Vertex Shader:</Text> Wave displacement
            effect using sin/cos functions
          </Text>
          <Text style={[styles.feature, { color: textColor }]}>
            • <Text style={styles.bold}>Fragment Shader:</Text> Animated
            gradient based on position and time
          </Text>
          <Text style={[styles.feature, { color: textColor }]}>
            • <Text style={styles.bold}>Fresnel Effect:</Text> Edge glow for
            depth perception
          </Text>
          <Text style={[styles.feature, { color: textColor }]}>
            • <Text style={styles.bold}>Pulse Animation:</Text> Breathing effect
            synchronized with time
          </Text>
        </View>

        <View style={styles.uniformsSection}>
          <Text style={[styles.uniformsTitle, { color: textColor }]}>
            Shader Uniforms:
          </Text>
          <Text style={[styles.uniform, { color: textColor, opacity: 0.7 }]}>
            u_time - Elapsed time for animations
          </Text>
          <Text style={[styles.uniform, { color: textColor, opacity: 0.7 }]}>
            u_color - Base color (cyan)
          </Text>
          <Text style={[styles.uniform, { color: textColor, opacity: 0.7 }]}>
            u_pulseSpeed - Animation speed (2.0)
          </Text>
          <Text style={[styles.uniform, { color: textColor, opacity: 0.7 }]}>
            u_pulseIntensity - Displacement strength (0.3)
          </Text>
        </View>

        <Text style={[styles.interaction, { color: textColor, opacity: 0.6 }]}>
          💡 Drag to rotate • Pinch to zoom
        </Text>
      </ScrollView>
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
  infoPanel: {
    maxHeight: 320,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  infoPanelContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 16,
    opacity: 0.7,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  featuresList: {
    marginBottom: 16,
    gap: 8,
  },
  feature: {
    fontSize: 13,
    lineHeight: 20,
  },
  bold: {
    fontWeight: "600",
  },
  uniformsSection: {
    marginTop: 8,
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  uniformsTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  uniform: {
    fontSize: 12,
    fontFamily: "monospace",
    marginLeft: 8,
    marginBottom: 4,
  },
  interaction: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
    fontStyle: "italic",
  },
});
