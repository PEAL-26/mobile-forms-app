import { cloneElement, Fragment, useEffect, useMemo, useState } from "react";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import uuid from "react-native-uuid";

import { cn } from "@/lib/utils";
import { sectionsSeed } from "@/db/data";
import { Button } from "@/components/ui/button";
import { AddModal } from "@/components/modals/add-modal";
import { FormModal } from "@/components/modals/form-modal";
import { RenderComponent } from "@/components/ui/render-component";

import { DATA, useRegister } from "./use-register";

export default function RegisterScreen() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);
  const window = useWindowDimensions();

  const router = useRouter();
  const {
    response,
    collections,
    form,
    isLoadingPage,
    handleSubmit,
    handleUpdate,
  } = useRegister();
  const formCollections = form.getValues("form");

  // const collections = useMemo(() => {
  //   return response.data;
  // }, [response]);

  if (isLoadingPage) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="#000" size="small" />
      </View>
    );
  }

  return (
    <>
      <View className="flex-1 relative">
        <View className="flex flex-row justify-between items-center p-3 bg-white gap-4">
          <View className="flex-1">
            <Button
              textClassName="font-bold text-lg flex-1 line-clamp-1"
              onPress={() => setOpenFormModal(true)}
            >
              {`${
                formCollections
                  ? `Formulário ${formCollections.name}`
                  : "Selecione um formulário"
              }`}
            </Button>
            {/* <Text className="font-normal text-xs">{`Secção ${currentStep} de ${totalSteps}`}</Text> */}
          </View>
          <Button onPress={() => router.replace("/(app)")}>Cancelar</Button>
        </View>
        <ScrollView className="flex-1 px-3 pt-3">
          {collections.length === 0 && (
            <View
              style={{ height: window.height }}
              className="flex-1 justify-center items-center"
            >
              <Text>Não foi carregado nenhum formulário!</Text>
            </View>
          )}
          <View className="mb-14 gap-4">
            {collections.map((item) => (
              <FormRender item={item} onUpdate={handleUpdate} />
            ))}
          </View>
        </ScrollView>
        <View className="absolute bottom-0 left-0 right-0 flex flex-row items-center justify-end p-3 ">
          {/* <Button
            disabled={currentStep === 1}
            style={[
              { ...(currentStep === 1 ? { backgroundColor: "#d1d5db" } : {}) },
            ]}
            className="rounded p-2 bg-black px-3"
            textClassName={`${currentStep === 1 ? "text-black" : "text-white"}`}
            onPress={handlePrev}
          >
            Anterior
          </Button> */}
          <Button
            className={cn("rounded p-2  px-3 bg-blue-700")}
            textClassName="text-white"
            onPress={handleSubmit}
          >
            {"Guardar"}
          </Button>
        </View>
      </View>
      <AddModal open={openAddModal} onClose={setOpenAddModal} />
      {/* <FormModal
        title="Formulários"
        open={openFormModal}
        onClose={setOpenFormModal}
      /> */}
    </>
  );
}

var lastSection = -1;
var showSection = false;

interface FormRenderProps {
  item: any;
  onUpdate?(identifier: string, data: any): void;
}

function FormRender(props: FormRenderProps) {
  const { item, onUpdate } = props;
  if (lastSection !== item.fields.sectionId) {
    lastSection = item?.fields.sectionId ?? -1;
    showSection = true;
  } else {
    showSection = false;
  }

  return (
    <Fragment>
      {showSection && (
        <View className="flex flex-row items-center gap-2 my-5">
          <View className="h-[1px] bg-gray-300 w-full flex-1" />
          <Text className="text-gray-600 max-w-[80%] text-center w-fit">
            {sectionsSeed[
              item?.fields.sectionId ? item?.fields.sectionId - 1 : -1
            ]?.name || ""}
          </Text>
          <View className="h-[1px] bg-gray-300 w-full flex-1" />
        </View>
      )}
      <RenderComponent
        key={item.fields.identifier}
        fields={item.fields}
        // defaultData={item.value}
        onChange={(value) => {
          onUpdate?.(item.fields.identifier, { value });
        }}
        onChangeExtras={(extras) => {
          onUpdate?.(item.fields.identifier, { value: extras });
        }}
      />
    </Fragment>
  );
}
