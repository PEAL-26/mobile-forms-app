import { View } from "react-native";
import { Text } from "../text";

interface Props {
  label: string;
}

export function SeparatorWithLabel({ label }: Props) {
  return (
    <View className="flex flex-row items-center gap-2 my-5">
      <View className="h-[1px] bg-gray-300 w-full flex-1" />
      <Text className="text-gray-600">{label}</Text>
      <View className="h-[1px] bg-gray-300 w-full flex-1" />
    </View>
  );
}
