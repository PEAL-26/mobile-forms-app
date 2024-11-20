import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

export interface FlashListErrorProps {
  refetch?(): void;
}

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
