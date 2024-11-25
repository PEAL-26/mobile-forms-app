import {
  Pressable,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal } from "react-native";
import { memo, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

import { generateDataPaginate } from "@/services/data";
import { useDebounce } from "@uidotdev/usehooks";
import { useQueryPagination } from "@/hooks/use-query-pagination";

import { Input } from "../ui/input";
import { FlashList, setFlashListLoader } from "../ui/flash-list";

type ItemType = {
  id: string;
  title: string;
};

export type SelectInfoType = {
  identifierField: string;
  data: any | null;
  dataWhere?: any | null;
  child_field?: {
    identifier?: string;
    clear: boolean;
  };
};

export type SelectedData = {
  identifierField: string;
  item: ItemType;
  child_field?: {
    identifier?: string;
    clear: boolean;
  };
};

interface SelectDataModalProps {
  info?: SelectInfoType;
  onSelect?(data: SelectedData): void;
  open?: boolean;
  onClose?(state: false): void;
}

export const SelectDataModal = memo((props: SelectDataModalProps) => {
  const { open, onClose, info, onSelect } = props;
  const { identifierField, data, dataWhere, child_field } = info || {};

  const [loadingToOpen, setLoadingToOpen] = useState(true);

  const handleClose = () => {
    onClose?.(false);
  };

  const handleSelect = (item: ItemType) => {
    if (!identifierField) return;

    onSelect?.({
      identifierField,
      item,
      child_field: {
        identifier: child_field?.identifier,
        clear: true,
      },
    });

    handleClose();
  };

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const table = useQueryPagination({
    fn: ({ page }) =>
      generateDataPaginate(data, { page, query: debouncedQuery, dataWhere }),
    queryKey: [
      "data",
      "data_tables",
      identifierField,
      debouncedQuery,
      { ...dataWhere },
    ],
  });

  useEffect(() => {
    let timeout = undefined;
    if (open) {
      timeout = setTimeout(() => {
        setLoadingToOpen(false);
      }, 700);
    }
    return () => clearTimeout(timeout);
  }, [open]);

  return (
    <Modal
      visible={open}
      onRequestClose={handleClose}
      transparent
      statusBarTranslucent
      animationType="fade"
    >
      <Pressable
        onPress={handleClose}
        className="flex-1 justify-center items-center bg-black/50 p-10"
      >
        <View className="relative rounded-md bg-white shadow overflow-hidden w-full h-96">
          {loadingToOpen && (
            <View className="flex-1 justify-center items-center ">
              <ActivityIndicator animating color="#000" />
            </View>
          )}
          {!loadingToOpen && (
            <>
              <View className="px-3 py-3 flex-row items-start gap-2">
                <Input
                  placeholder="Pesquisar..."
                  onChangeText={setQuery}
                  className="flex-1"
                />
              </View>

              <FlashList
                data={debouncedQuery && table?.isFetching ? [] : table.data}
                refreshing={table?.isLoading}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="px-3"
                    activeOpacity={0.6}
                    onPress={() => handleSelect(item)}
                  >
                    <View className="rounded py-1 px-3 bg-white border-b border-gray-300 h-10">
                      <Text className="line-clamp-2 flex-1">{item?.title}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item: any) => item.id}
                refreshControl={
                  <RefreshControl
                    refreshing={table?.isLoading}
                    onRefresh={table?.refetch}
                    colors={["#000", "#FFF"]}
                  />
                }
                ListFooterComponent={setFlashListLoader(
                  table?.isFetching,
                  table?.isError,
                  table?.refetch
                )}
                ListEmptyComponent={
                  table?.isEmpty ? (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text className="text-sm text-center max-w-[250px]">
                        {debouncedQuery
                          ? "Nenhum item encontrado"
                          : "Sem items cadastrado"}
                      </Text>
                    </View>
                  ) : null
                }
                ListFooterComponentStyle={{ paddingVertical: 16 }}
                estimatedItemSize={40}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
                onEndReached={table.loadNextPageData}
              />
            </>
          )}
        </View>
      </Pressable>
    </Modal>
  );
});

SelectDataModal.displayName = "SelectDataModal";
