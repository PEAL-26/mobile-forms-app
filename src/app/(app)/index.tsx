import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TextInput, View } from "react-native";

import {
  PlusIcon,
  DownloadIcon,
  CogIcon,
  PencilIcon,
} from "lucide-react-native";
import { useConnection } from "@/hooks/use-connection";

export default function HomeScreen() {
  // const { db } = useConnection();

  const DATA = Array.from({ length: 100 }).map((_, key) => ({
    id: String(key + 1),
    province: `Luanda ${key + 1}`,
    city: `Viana ${key + 1}`,
  }));

  const router = useRouter();

  return (
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
      {/* Barra de Pesquisa */}
      <View className="px-3 py-1">
        <TextInput
          placeholder="Pesquisar..."
          className="ring-0 ring-offset-0 border-0 p-1"
          style={{ borderWidth: 0, borderColor: "transparent" }}
        />
      </View>

      {/* Body */}
      <ScrollView className="px-3 pt-3">
        <View className="mb-[112px] gap-3 flex flex-col">
          {DATA.map((item) => (
            <View
              key={item.id}
              className="p-2 pr-3 shadow-inherit rounded bg-white flex flex-row items-center justify-between"
            >
              <View>
                <Text className="font-bold text-base">{item.province}</Text>
                <Text className="font-normal text-sm">{item.province}</Text>
              </View>

              <Button icon={PencilIcon} iconClassName="size-4" />
            </View>
          ))}
        </View>
      </ScrollView>

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
        />
      </View>
    </View>
  );
}
