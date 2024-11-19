import { View } from "react-native";
import { Button } from "../button";
import { Text } from "../text";
import { FlashListErrorProps } from "./types";

export function FlashListError({ refetch }: FlashListErrorProps) {
  return (
    <View className="gap-6 flex-col justify-center items-center">
      <Text className="text-gray-2 font-medium text-xs text-center max-w-lg">
        Oops! Algo deu errado, recarregue e se o erro persistir entre em
        contanto com o suporte.
      </Text>
      <Button
        textClassName="text-brand font-bold text-base"
        onPress={() => refetch?.()}
      >
        Recarregar
      </Button>
    </View>
  );
}
