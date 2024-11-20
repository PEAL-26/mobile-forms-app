import { useState } from "react";
import { RefreshControl } from "react-native";
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
    isSaving,
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
        refreshControl={
          <RefreshControl
            refreshing={isLoadingAll}
            onRefresh={refetch}
            colors={["#000", "#FFF"]}
          />
        }
        renderItem={({ item }) => (
          <FormRender item={item} onUpdate={handleUpdate} />
        )}
        keyExtractor={(item) => item.fields.identifier}
        // ListHeaderComponent={header}
        // ListFooterComponent={setFlashListLoader(isFetching, isError, refetch)}
        ListEmptyComponent={
          isEmpty ? (
            <View
              style={{
                height: window.height - 360,
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
        onEndReachedThreshold={0.3}
        showsVerticalScrollIndicator={false}
        onEndReached={loadNextPageData}
      />

      <View className="absolute bottom-0 left-0 right-0 flex flex-row items-center justify-end p-3 ">
        <Button
          className={cn("rounded p-2  px-3 bg-blue-700")}
          textClassName="text-white"
          onPress={handleSubmit}
        >
          Guardar
        </Button>
      </View>

      <Loading show={isSaving} />

      <AddModal open={openAddModal} onClose={setOpenAddModal} />
    </>
  );
}
