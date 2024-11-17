import { AddModal } from "@/components/modals/add-modal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function RegisterScreen() {
  const [openAddModal, setOpenAddModal] = useState(false);

  return (
    <>
      <View className="flex-1">
        <View className="flex justify-between items-center">
          <Text className="font-bold text-lg">Secção 1 de 8</Text>
          <Button>Cancelar</Button>
        </View>
        <ScrollView className="flex-1"></ScrollView>
        <View className="flex items-center justify-between">
          <Button>Anterior</Button>
          <Button>Próximo</Button>
        </View>
      </View>
      <AddModal open={openAddModal} onClose={setOpenAddModal} />
    </>
  );
}
