import { Fragment, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

import { AddModal } from "@/components/modals/add-modal";
import { Text } from "@/components/ui/text";
import { sectionsSeed } from "@/db/data";
import { RenderComponent } from "@/components/ui/render-component";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useRegister } from "./use-register";
import { RegisterDataCollectionsProps } from "./types";
import { FormRender } from "./form-render";
import { FlashList } from "@/components/ui/flash-list";
import { RefreshControl } from "react-native";

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
                Este formulário não possui nenhum campo para preenchimento!
              </Text>
            </View>
          ) : null
        }
        ListFooterComponentStyle={{ paddingVertical: 16 }}
        estimatedItemSize={132}
        onEndReachedThreshold={0.3}
        showsVerticalScrollIndicator={false}
        onEndReached={loadNextPageData}
      />

      {/* <ScrollView className="flex-1 px-3 pt-3">
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
      </ScrollView> */}

      <View className="absolute bottom-0 left-0 right-0 flex flex-row items-center justify-end p-3 ">
        <Button
          className={cn("rounded p-2  px-3 bg-blue-700")}
          textClassName="text-white"
          onPress={handleSubmit}
        >
          Guardar
        </Button>
      </View>

      <AddModal open={openAddModal} onClose={setOpenAddModal} />
    </>
  );
}
