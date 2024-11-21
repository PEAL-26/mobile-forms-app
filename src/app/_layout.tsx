import "react-native-gesture-handler";
import "react-native-reanimated";
import "../styles/global.css";

import { useEffect } from "react";
import { Stack } from "expo-router";
import { Text } from "react-native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { ActivityIndicator, View } from "react-native";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";

import { useSeeds } from "@/hooks/use-seeds";
import { connectionDrizzle, expoOpenDatabase } from "@/db";

import migrations from "../../drizzle/migrations";

SplashScreen.preventAutoHideAsync();
// SplashScreen.setOptions({
//   duration: 1000,
//   fade: true,
// });

const queryClient = new QueryClient();

export default function RootLayout() {
  useDrizzleStudio(expoOpenDatabase);

  const migration = useMigrations(connectionDrizzle, migrations);
  const seed = useSeeds({
    connection: connectionDrizzle,
    migrated: migration.success,
  });

  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (migration?.error || seed?.error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>
          Oops! Migration error:{" "}
          {migration?.error?.message || seed.error?.message}
        </Text>
      </View>
    );
  }

  if (!loaded || !migration.success || !seed.success) {
    return (
      <View className="flex-1 justify-center items-center ">
        <ActivityIndicator color="#000" size="small" />
        <StatusBar style="dark" translucent animated />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <AutocompleteDropdownContextProvider>
            <QueryClientProvider client={queryClient}>
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
            </QueryClientProvider>
            <StatusBar style="dark" translucent animated />
          </AutocompleteDropdownContextProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
