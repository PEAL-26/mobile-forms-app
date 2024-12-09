import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { Text, View } from "react-native";

import { Button } from "@/components/ui/button";
import { DataTableSetting } from "@/components/templates/settings";

export default function DataTableSettingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ table_name: string }>();

  console.log(params);
  return (
    <View className="relative flex-1">
      {/* Header */}
      <View className="flex-row flex items-center w-full justify-between  bg-white gap-3 border-b border-b-gray-200 elevation-lg p-3 h-12">
        <View className="flex-row flex items-center gap-3">
          <Button icon={ArrowLeftIcon} onPress={() => router.back()} />
          <Text className="font-bold text-lg">
            {params.table_name !== "undefined"
              ? "Editar Tabela de Dados"
              : "Adicionar Tabela de Dados"}
          </Text>
        </View>
      </View>

      {/* Body */}
      <DataTableSetting />
    </View>
  );
}
