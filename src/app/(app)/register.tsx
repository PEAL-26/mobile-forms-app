import { useState } from "react";
import { useRouter } from "expo-router";
import { View } from "react-native";

import { formsSeed } from "@/db/data";
import { Button } from "@/components/ui/button";
import { ListingFormsModal } from "@/components/modals/listing-forms-modal";
import { RegisterDataCollections } from "@/components/templates/register-data-collections";

export default function RegisterScreen() {
  const router = useRouter();
  const [form, setForm] = useState<{
    id: number;
    name: string;
    description?: string;
  }>(() => formsSeed[0]);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <View className="flex-1 relative">
        <View
          style={{ display: isLoading ? "none" : "flex" }}
          className="flex flex-row justify-between items-center p-3 bg-white gap-4"
        >
          <View className="flex-1">
            <Button
              textClassName="font-bold text-lg flex-1 line-clamp-1 w-full"
              className="flex-1 w-full"
              containerClassName="flex-1 w-full"
              onPress={() => setOpenFormModal(true)}
            >
              {`${
                form ? `Formulário ${form.name}` : "Selecione um formulário"
              }`}
            </Button>
            {/* <Text className="font-normal text-xs">{`Secção ${currentStep} de ${totalSteps}`}</Text> */}
          </View>
          <Button onPress={() => router.replace("/(app)")}>Cancelar</Button>
        </View>
        <RegisterDataCollections form={form} onLoading={setIsLoading} />
      </View>
      <ListingFormsModal
        open={openFormModal}
        onClose={setOpenFormModal}
        onSelect={setForm}
      />
    </>
  );
}
