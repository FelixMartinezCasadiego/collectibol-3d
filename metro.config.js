const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Resolve react-three/fiber issues with expo-gl
config.resolver.sourceExts.push("cjs");

module.exports = config;
