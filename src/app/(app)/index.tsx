import { useState } from "react";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import { PlusIcon, DownloadIcon, CogIcon } from "lucide-react-native";

import { Button } from "@/components/ui/button";
import { ExportDataModal } from "@/components/modals/export-data-modal";
import { ListingDataCollections } from "@/components/templates/listing-data-collections";

export default function HomeScreen() {
  const [openExportDataModal, setOpenExportData] = useState(false);
  const router = useRouter();

  return (
    <>
      <View className="relative flex-1">
        {/* Header */}
        <View className="flex-row flex items-center w-full justify-between  bg-white gap-3 border-b border-b-gray-200 elevation-lg p-3">
          <View className="flex-row flex items-center gap-3">
            <Image
              source={require("../../../assets/images/logo.png")}
              style={{ width: 40, height: 40 }}
            />
            <Text className="font-bold text-lg">DAP Essentials Needs</Text>
          </View>
          <Button
            icon={CogIcon}
            onPress={() => router.push("/(app)/configuracoes")}
          />
        </View>

        <ListingDataCollections />

        {/* Buttons */}
        <View className="absolute right-3 bottom-3 flex flex-col gap-3">
          <Button
            className="w-12 h-12 bg-black rounded-full justify-center items-center"
            onPress={() => router.push("/(app)/register")}
            icon={PlusIcon}
            iconColor="#fff"
          />
          <Button
            className="w-12 h-12 bg-blue-600 rounded-full justify-center items-center"
            icon={DownloadIcon}
            iconColor="#fff"
            onPress={() => setOpenExportData(true)}
          />
        </View>
      </View>
      <ExportDataModal open={openExportDataModal} onClose={setOpenExportData} />
    </>
  );
}
