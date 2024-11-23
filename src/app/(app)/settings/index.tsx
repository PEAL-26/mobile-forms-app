import { useState } from "react";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { ArrowLeftIcon } from "lucide-react-native";

import {
  SettingFormListing,
  SettingDataTablesListing,
} from "@/components/templates/settings";
import { Button } from "@/components/ui/button";

export default function SettingsScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<"forms" | "dataTables">("forms");

  return (
    <View className="relative flex-1">
      {/* Header */}
      <View className="flex-row flex items-center w-full justify-between  bg-white gap-3 border-b border-b-gray-200 elevation-lg p-3 h-12">
        <View className="flex-row flex items-center gap-3">
          <Button icon={ArrowLeftIcon} onPress={() => router.push("/(app)")} />
          <Text className="font-bold text-lg">Configurações</Text>
        </View>
      </View>

      {/* Body */}
      <View className="flex-row w-full gap-3 justify-center p-4">
        <Button
          onPress={() => setTab("forms")}
          className="bg-white rounded-md py-2 px-3"
          style={{ backgroundColor: tab === "forms" ? "#FFF" : "transparent" }}
        >
          Formulários
        </Button>
        <Button
          onPress={() => setTab("dataTables")}
          className="bg-white rounded-md py-2 px-3"
          style={{
            backgroundColor: tab === "dataTables" ? "#FFF" : "transparent",
          }}
        >
          <Text>Tabelas de Dados</Text>
        </Button>
      </View>

      {tab === "forms" && <SettingFormListing />}
      {tab === "dataTables" && <SettingDataTablesListing />}
    </View>
  );
}
