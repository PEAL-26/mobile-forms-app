const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push("sql");
config.transformer.minifierConfig = {
  compress: {
    drop_console: ["log", "info"],
  },
};
module.exports = withNativeWind(config, { input: "./src/styles/global.css" });
