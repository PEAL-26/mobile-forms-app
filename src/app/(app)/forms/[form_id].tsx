import { ScrollView, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { router, useGlobalSearchParams } from "expo-router";
import {
  ArrowLeftIcon,
  Edit2Icon,
  PlusIcon,
  TrashIcon,
} from "lucide-react-native";

import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { formGetByIdService } from "@/services/forms";
import { LoadingPage } from "@/components/ui/loading";
import { SeparatorWithLabel } from "@/components/ui/separator";
import { NotFoundPage } from "@/components/ui/page-errors";

export default function FormDetailsScreen() {
  const params = useGlobalSearchParams<{ form_id: string }>();

  const {
    data: form,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => formGetByIdService(Number(params.form_id)),
    queryKey: ["form", params.form_id],
  });

  if (isLoading) {
    return <LoadingPage backgroundColor="transparent" color="#000" />;
  }

  if (!form) {
    return (
      <NotFoundPage refetch={refetch} title="Formulário não encontrado!" />
    );
  }

  return (
    <View className="relative flex-1">
      {/* Header */}
      <View className="flex-row flex items-center w-full justify-between  bg-white gap-3 border-b border-b-gray-200 elevation-lg p-3 h-16">
        <View className="flex-row flex items-center gap-3">
          <Button icon={ArrowLeftIcon} onPress={() => router.back()} />
          <Text className="font-bold text-lg">Detalhes do Formulário</Text>
        </View>
        <Button
          icon={PlusIcon}
          onPress={() => router.push(`/(app)/collect-data/${params.form_id}`)}
        />
      </View>
      <View className="px-3 pt-3">
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View className="bg-white rounded-md p-3 gap-2">
            <Text className="font-bold text-base">{form.name}</Text>
            <Text className="text-xs text-gray-500">{form.description}</Text>
          </View>

          <SeparatorWithLabel label="Dados (0)" />

          {Array.from({ length: 5 }).map(() => (
            <Button className="bg-white p-3 rounded mt-3 flex-row items-center justify-between gap-3">
              <>
                <View>
                  <Text className="font-bold line-clamp-1">Identificador</Text>
                </View>
                <View className="flex-row items-center gap-3">
                  <Button icon={() => <Edit2Icon size={20} color="#000" />} />
                  <Button icon={() => <TrashIcon size={20} color="red" />} />
                </View>
              </>
            </Button>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
