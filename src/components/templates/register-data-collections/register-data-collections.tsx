import { useState } from "react";
import { ActivityIndicator, useWindowDimensions, View } from "react-native";

import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { FlashList } from "@/components/ui/flash-list";
import { AddModal } from "@/components/modals/add-modal";

import { FormRender } from "./form-render";
import { useRegister } from "./use-register";
import { RegisterDataCollectionsProps } from "./types";
import { Loading } from "@/components/ui/loading";
import { setFlashListLoader } from "./flash-list-loader";

export function RegisterDataCollections(props: RegisterDataCollectionsProps) {
  const window = useWindowDimensions();
  const [openAddModal, setOpenAddModal] = useState(false);

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

  if (isLoadingPage) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="#000" size="small" />
      </View>
    );
  }

  return (
    <>
      <FlashList
        data={collections}
        refreshing={isLoadingAll}
        renderItem={({ item }) => (
          <FormRender item={item} onUpdate={handleUpdate} />
        )}
        keyExtractor={(item) => item.fields.identifier}
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
          return item.fields.type;
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
    </>
  );
}
