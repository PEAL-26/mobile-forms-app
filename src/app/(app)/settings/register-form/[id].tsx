import { Text, View } from "react-native";
import { ArrowLeftIcon } from "lucide-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { LoadingPage } from "@/components/ui/loading";
import { RegisterForm } from "@/components/templates/register-form";
import { getFormByIdWithCountFieldsService } from "@/services/forms";
import { NotFoundPage, ErrorPage } from "@/components/ui/page-errors";

export default function RegisterFormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();

  const {
    data: form,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => {
      if (params.id !== "undefined") {
        return getFormByIdWithCountFieldsService(Number(params.id));
      }

      return null;
    },
    queryKey: ["form", params.id],
  });

  if (isLoading) {
    return <LoadingPage backgroundColor="transparent" />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  if (params.id !== "undefined" && !form && !isError && !isLoading) {
    return (
      <NotFoundPage refetch={refetch} title="Formulário não encontrado!" />
    );
  }

  return (
    <View className="relative flex-1">
      {/* Header */}
      <View className="flex-row flex items-center w-full justify-between  bg-white gap-3 border-b border-b-gray-200 elevation-lg p-3 h-12">
        <View className="flex-row flex items-center gap-3">
          <Button icon={ArrowLeftIcon} onPress={() => router.back()} />
          <Text className="font-bold text-lg">
            {params.id !== "undefined"
              ? "Editar formulário"
              : "Adicionar formulário"}
          </Text>
        </View>
      </View>

      {/* Body */}
      <RegisterForm form={form} />
    </View>
  );
}
