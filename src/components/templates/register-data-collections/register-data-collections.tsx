import { useState } from "react";
import { ActivityIndicator, useWindowDimensions, View } from "react-native";

import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { FlashList, setFlashListLoader } from "@/components/ui/flash-list";
import { AddModal } from "@/components/modals/add-modal";

import { FormRender } from "./form-render";
import { useRegister } from "./use-register";
import { RegisterDataCollectionsProps } from "./types";
import { Loading } from "@/components/ui/loading";
import { SelectDataModal } from "@/components/modals/select-data-modal";
import { DataCollectionFieldSchemaType } from "./schema";

export function RegisterDataCollections(props: RegisterDataCollectionsProps) {
  const { isLoadingForm } = props;

  const window = useWindowDimensions();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openSelectModal, setOpenSelectModal] = useState(false);
  const [selectInfoModal, setSelectInfoModal] = useState("");

  const {
    collections,
    isLoadingPage,
    handleSubmit,
    handleUpdate,
    isLoadingAll,
    isEmpty,
    isFetching,
    isError,
    isSaving,
    totalItems,
    refetch,
    loadNextPageData,
  } = useRegister(props);

  if (isLoadingPage || isLoadingForm) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="#000" size="small" />
      </View>
    );
  }

  const handleOpenSelectModal = (item: DataCollectionFieldSchemaType) => {
    console.log(item);
    setOpenSelectModal(true);
    setSelectInfoModal("");
  };

  return (
    <>
      <FlashList
        data={collections}
        refreshing={isLoadingAll}
        renderItem={({ item }) => (
          <FormRender
            fields={item}
            onUpdate={handleUpdate}
            onOpenOutside={() => {
              handleOpenSelectModal(item);
            }}
          />
        )}
        keyExtractor={(item: any) => item.identifier}
        ListFooterComponent={setFlashListLoader(isFetching, isError, refetch, {
          height: collections.length === 0 ? window.height - 80 : undefined,
        })}
        ListEmptyComponent={
          isEmpty ? (
            <View
              style={{
                height: window.height - 80,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text className="text-sm text-center max-w-[250px]">
                {props.form
                  ? "Este formulário não possui nenhum campo para preenchimento!"
                  : "Selecione um formulário!"}
              </Text>
            </View>
          ) : null
        }
        getItemType={(item) => {
          return item.type;
        }}
        ListFooterComponentStyle={{ paddingVertical: 16 }}
        // estimatedItemSize={132}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        onEndReached={loadNextPageData}
      />

      <View className="absolute bottom-0 left-0 right-0 flex flex-row items-center justify-end p-3 ">
        {!isError &&
          !isFetching &&
          collections.length > 0 &&
          collections.length === totalItems && (
            <Button
              className={cn("rounded p-2  px-3 bg-blue-700")}
              textClassName="text-white"
              onPress={handleSubmit}
            >
              Guardar
            </Button>
          )}
      </View>

      <Loading show={isSaving} />

      <AddModal open={openAddModal} onClose={setOpenAddModal} />
      <SelectDataModal
        info={selectInfoModal}
        open={openSelectModal}
        onClose={setOpenSelectModal}
      />
    </>
  );
}
