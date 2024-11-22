import { Text, View } from "react-native";
import { ArrowLeftIcon } from "lucide-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { Button } from "@/components/ui/button";
import { RegisterForm } from "@/components/templates/register-form";

export default function FormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();

  return (
    <View className="relative flex-1">
      {/* Header */}
      <View className="flex-row flex items-center w-full justify-between  bg-white gap-3 border-b border-b-gray-200 elevation-lg p-3 h-12">
        <View className="flex-row flex items-center gap-3">
          <Button icon={ArrowLeftIcon} onPress={() => router.back()} />
          <Text className="font-bold text-lg">
            {params.id ? "Editar formulário" : "Adicionar formulário"}
          </Text>
        </View>
      </View>

      {/* Body */}
      <RegisterForm />
    </View>
  );
}
