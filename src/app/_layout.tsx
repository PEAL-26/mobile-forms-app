import "react-native-gesture-handler";
import "react-native-reanimated";
import "../styles/global.css";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ActivityIndicator, View } from "react-native";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="#000" size="small" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <AutocompleteDropdownContextProvider>
            <Stack initialRouteName="(app)/index">
              <Stack.Screen
                name="(app)/index"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(app)/register"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(app)/configuracoes"
                options={{ headerShown: false }}
              />
            </Stack>
            <StatusBar style="dark" translucent animated />
          </AutocompleteDropdownContextProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
