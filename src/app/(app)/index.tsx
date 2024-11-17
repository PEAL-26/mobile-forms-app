import { Button } from "@/components/ui/button";
import { ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="relative flex-1">
      <View className="flex-1 flex justify-between items-center">
        <Text className="font-bold text-lg">DAP Essentials Needs</Text>
        <Button className="absolute w-10 h-10 bg-blue-600">
          <Text>Exportar Excel</Text>
        </Button>
      </View>
      <ScrollView>
        <View></View>
      </ScrollView>
      <Button className="absolute w-10 h-10 bg-blue-600" />
    </View>
  );
}
