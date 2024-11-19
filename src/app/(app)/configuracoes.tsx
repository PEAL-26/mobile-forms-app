import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { ArrowLeftIcon } from "lucide-react-native";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import {
  SettingCityListing,
  SettingFormationListing,
  SettingFormListing,
  SettingProvinceListing,
  SettingDataTablesListing,
} from "@/components/templates/settings";

export default function ConfiguracoesScreen() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<string>("forms");

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Em desenvolvimento</Text>
    </View>
  );
  return (
    <View className="relative flex-1">
      {/* Header */}
      <View className="flex-row flex items-center w-full justify-between  bg-white gap-3 border-b border-b-gray-200 elevation-lg p-3">
        <View className="flex-row flex items-center gap-3">
          <Button icon={ArrowLeftIcon} onPress={() => router.back()} />
          <Text className="font-bold text-lg">Configurações</Text>
        </View>
      </View>

      {/* Body */}
      <View className=" gap-3 flex flex-col px-3 pt-3">
        <Tabs
          value={currentTab}
          onValueChange={(tab) => setCurrentTab(tab)}
          className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
        >
          <TabsList className="flex-row w-full">
            <TabsTrigger value="forms" className="flex-1">
              <Text>Formulários</Text>
            </TabsTrigger>
            <TabsTrigger value="dataTables" className="flex-1">
              <Text>Tabelas de Dados</Text>
            </TabsTrigger>
          </TabsList>
          <SettingFormListing />
          <SettingDataTablesListing />
        </Tabs>
      </View>
    </View>
  );
}
