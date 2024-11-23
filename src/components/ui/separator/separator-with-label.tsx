import { View } from "react-native";
import { Text } from "../text";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  className?: string;
}

export function SeparatorWithLabel({ label, className }: Props) {
  return (
    <View className={cn("flex flex-row items-center gap-2 my-5", className)}>
      <View className="h-[1px] bg-gray-300 w-full flex-1" />
      <Text className="text-gray-600">{label}</Text>
      <View className="h-[1px] bg-gray-300 w-full flex-1" />
    </View>
  );
}
