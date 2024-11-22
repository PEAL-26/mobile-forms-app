import { router } from "expo-router";
import { View } from "react-native";
import { Text } from "../text";
import { Button } from "../button";

interface Props {
  title?: string;
  refetch?(): void;
}

export function NotFoundPage(props: Props) {
  const { refetch, title = "Recurso não encontrado!" } = props;

  return (
    <View className="flex-1 justify-center items-center">
      <Text>{title}</Text>
      <View className="flex-row gap-2 items-center mt-2">
        <Button
          onPress={() => router.back()}
          className="bg-white p-2 rounded w-24 justify-center items-center"
          textClassName="text-center"
        >
          Voltar
        </Button>
        <Button
          onPress={() => refetch?.()}
          className="bg-black p-2 rounded w-24 justify-center items-center"
          textClassName="text-white text-center"
        >
          Recarregar
        </Button>
      </View>
    </View>
  );
}
