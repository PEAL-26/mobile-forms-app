import { useState } from "react";
import {
  Modal,
  RefreshControl,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { XIcon } from "lucide-react-native";
import { useDebounce } from "@uidotdev/usehooks";

import { listForms } from "@/services/forms";
import { useQueryPagination } from "@/hooks/use-query-pagination";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FlashList, setFlashListLoader } from "../ui/flash-list";

type Form = {
  id: number;
  name: string;
  descriptions: string | null;
};

interface Props {
  onSelect?(data: Form): void;
  open?: boolean;
  onClose?(state: false): void;
}

export function ListingFormsModal(props: Props) {
  const { open, onClose, onSelect } = props;
  const window = useWindowDimensions();

  const handleClose = () => {
    onClose?.(false);
  };

  const handleSelect = (form: Form) => {
    onSelect?.(form);
    handleClose();
  };

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const {
    data,
    isEmpty,
    isError,
    isFetching,
    isLoading,
    refetch,
    loadNextPageData,
  } = useQueryPagination({
    fn: ({ page }) => listForms({ page, query: debouncedQuery }),
    queryKey: ["forms", debouncedQuery],
  });

  return (
    <Modal
      visible={open}
      onRequestClose={handleClose}
      transparent
      statusBarTranslucent
      animationType="fade"
    >
      <View className="flex-1 justify-center items-center bg-black/50 p-10">
        <View className="rounded-md bg-white shadow overflow-hidden h-[400px] w-full">
          {/* Header */}
          <View className="flex flex-row items-center justify-between p-3 border-b border-b-gray-200">
            <Text className="font-bold">Selecione um formulário</Text>
            <Button onPress={handleClose} icon={XIcon} />
          </View>

          {/* Body */}
          <View className="px-3 py-3">
            <Input placeholder="Pesquisar..." onChangeText={setQuery} />
          </View>

          <FlashList
            data={query && isFetching ? [] : data}
            refreshing={isLoading}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="px-3"
                activeOpacity={0.6}
                onPress={() => handleSelect(item)}
              >
                <View className="rounded py-1 px-3 bg-white border-b border-gray-300">
                  <Text className="line-clamp-2 flex-1">{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item: any) => item.id}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={refetch}
                colors={["#000", "#FFF"]}
              />
            }
            ListFooterComponent={setFlashListLoader(
              isFetching,
              isError,
              refetch,
              {
                height: data.length === 0 ? window.height - 80 : undefined,
              }
            )}
            ListEmptyComponent={
              isEmpty ? (
                <View
                  style={{
                    height: query ? undefined : window.height - 80,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text className="text-sm text-center max-w-[250px]">
                    {query
                      ? "Nenhum formulário encontrado"
                      : "Sem nenhum formulário cadastrado"}
                  </Text>
                </View>
              ) : null
            }
            ListFooterComponentStyle={{ paddingVertical: 16 }}
            estimatedItemSize={80}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            onEndReached={loadNextPageData}
          />
        </View>
      </View>
    </Modal>
  );
}
