import { View } from "react-native";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

import { Button } from "@/components/ui/button";
import { formGetByIdService } from "@/services/forms";
import { ListingFormsModal } from "@/components/modals/listing-forms-modal";
import { RegisterDataCollections } from "@/components/templates/register-data-collections";

export default function CollectDataScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ form_id: string }>();

  const formIdRef = useRef<number | undefined>(undefined);
  const [formId, setFormId] = useState<number | undefined>(() =>
    params.form_id !== "undefined" ? Number(params.form_id) : undefined
  );
  const [openFormModal, setOpenFormModal] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  console.log(params.form_id);

  const { data: form = null, isLoading } = useQuery({
    queryFn: () => {
      return formId ? formGetByIdService(formId) : null;
    },
    queryKey: ["form", formId],
  });

  if (formIdRef.current !== formId) {
    formIdRef.current = formId;
  }

  return (
    <>
      <View className="flex-1 relative">
        <View
          style={{ display: isLoadingPage ? "none" : "flex" }}
          className="flex flex-row justify-between items-center p-3 bg-white gap-4 h-12"
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
          <Button onPress={() => router.push("/(app)")}>Cancelar</Button>
        </View>

        {!form && (
          <View className="flex-1 flex-row justify-center items-center">
            <Button
              textClassName="font-bold text-lg"
              onPress={() => setOpenFormModal(true)}
            >
              Selecione um formulário
            </Button>
          </View>
        )}

        {form && (
          <RegisterDataCollections
            form={form || undefined}
            isLoadingForm={isLoading}
            onLoadingPage={setIsLoadingPage}
          />
        )}
      </View>
      <ListingFormsModal
        open={openFormModal}
        onClose={setOpenFormModal}
        onSelect={(item) => {
          if (formIdRef.current !== item.id) {
            setFormId(item.id);
          }
        }}
      />
    </>
  );
}
