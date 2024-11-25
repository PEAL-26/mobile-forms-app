import { useState } from "react";
import { ActivityIndicator, useWindowDimensions, View } from "react-native";

import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { AddModal } from "@/components/modals/add-modal";
import {
  SelectDataModal,
  SelectInfoType,
} from "@/components/modals/select-data-modal";
import { FlashList, setFlashListLoader } from "@/components/ui/flash-list";

import { FormRender } from "./form-render";
import { useRegister } from "./use-register";
import { RegisterDataCollectionsProps } from "./types";
import { DataCollectionFieldSchemaType } from "./schema";

export function RegisterDataCollections(props: RegisterDataCollectionsProps) {
  const { isLoadingForm } = props;

  const window = useWindowDimensions();

  const [openAddModal, setOpenAddModal] = useState(false);
  // const [openSelectModal, setOpenSelectModal] = useState(false);
  // const [selectInfo, setSelectInfo] = useState<SelectInfoType | undefined>(
  //   undefined
  // );

  const {
    collections,
    form,
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

  // const handleOpenSelectModal = (item: DataCollectionFieldSchemaType) => {
  //   setOpenSelectModal(true);
  //   const collections = form.getValues("collections");

  //   let dataWhere = item.dataWhere
  //     ? JSON.parse(JSON.stringify(item.dataWhere))
  //     : null;
  //   if (dataWhere) {
  //     const parentField = collections.find(
  //       (c) => c.fields.identifier === dataWhere.parent_identifier
  //     );

  //     if (parentField) {
  //       dataWhere.value = parentField.value[dataWhere.parent_field];
  //     }
  //   }

  //   const child = collections.find((col) => {
  //     if (col.fields.dataWhere) {
  //       return col.fields?.dataWhere?.parent_identifier === item.identifier;
  //     }
  //     return false;
  //   });

  //   setSelectInfo({
  //     identifierField: item.identifier,
  //     data: item.data,
  //     dataWhere,
  //     child_field: {
  //       identifier: child?.fields?.identifier,
  //       clear: false,
  //     },
  //   });
  // };

  const collectionsWatch = form.watch("collections");

  console.log(JSON.stringify(collections, null, 3));
  return (
    <>
      <FlashList
        data={collections}
        refreshing={isLoadingAll}
        renderItem={({ item }) => (
          <FormRender
            fields={item}
            value={item.value}
            onUpdate={handleUpdate}
            // onOpenOutside={() => {
            //   handleOpenSelectModal(item);
            // }}
            onClearSelect={(index) => {
              form.setValue(`collections.${index}.value`, null);
            }}
            collections={collectionsWatch}
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
      {/* {openSelectModal && (
        <SelectDataModal
          info={selectInfo}
          open={openSelectModal}
          onClose={setOpenSelectModal}
          onSelect={({ identifierField, item, child_field }) => {
            if (child_field?.clear) {
              const collections = form.getValues("collections");
              const fieldIndex = collections.findIndex(
                (c) => c.fields.identifier === child_field.identifier
              );

              form.setValue(`collections.${fieldIndex}.value`, null);
            }

            handleUpdate(identifierField, item);
          }}
        />
      )} */}
    </>
  );
}
