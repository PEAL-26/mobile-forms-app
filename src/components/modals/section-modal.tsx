import { Fragment, useState } from "react";
import { ArrowLeftIcon, PlusIcon, XIcon } from "lucide-react-native";
import { useDebounce } from "@uidotdev/usehooks";
import { useQueryPagination } from "@/hooks/use-query-pagination";
import {
  View,
  Modal,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import { useQueryClient } from "@tanstack/react-query";
import { createSectionService } from "@/services/sections";
import { listSectionService } from "@/services/sections/list";

import { Text } from "../ui/text";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { FlashList, setFlashListLoader } from "../ui/flash-list";

type SectionType = {
  id: number;
  name: string;
  description: string | null;
};

interface Props {
  open?: boolean;
  onClose?(state: false): void;
  onSelect?(section: SectionType): void;
}

export function SectionModal(props: Props) {
  const { open, onClose, onSelect } = props;

  const handleClose = () => {
    onClose?.(false);
  };

  const handleSelect = (section: SectionType) => {
    onSelect?.(section);
    onClose?.(false);
  };

  const [createSection, setCreateSection] = useState(false);

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const queryClient = useQueryClient();

  const {
    data,
    isEmpty,
    isError,
    isFetching,
    isLoading,
    refetch,
    loadNextPageData,
  } = useQueryPagination({
    fn: ({ page }) => listSectionService({ page, query: debouncedQuery }),
    queryKey: ["sections", debouncedQuery],
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!name?.trim()) {
      return setError("Título obrigatório");
    }

    try {
      setError("");
      setIsSaving(true);
      const response = await createSectionService({ name, description });
      console.log(response);

      queryClient.invalidateQueries({
        queryKey: ["forms", debouncedQuery],
      });
      handleSelect(response);
    } catch (error) {
      setIsSaving(true);
      setError("Título obrigatório");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      visible={open}
      onRequestClose={handleClose}
      transparent
      statusBarTranslucent
      animationType="fade"
    >
      <View className="flex-1 justify-center items-center bg-black/50 p-10">
        <View className="relative rounded-md bg-white shadow overflow-hidden h-[400px] w-full">
          {/* Header */}
          <View
            style={[
              createSection
                ? {
                    transform: [
                      {
                        translateX: -400,
                      },
                    ],
                  }
                : {
                    transform: [
                      {
                        translateX: 0,
                      },
                    ],
                  },
            ]}
            className="absolute transition-all inset-0"
          >
            <View className="flex flex-row items-center justify-between p-3 border-b border-b-gray-200">
              <Text className="font-bold">Selecione uma secção</Text>
              <Button onPress={handleClose} icon={XIcon} />
            </View>

            {/* Body */}
            <View className="px-3 py-3 flex-row items-start gap-2">
              <Input
                placeholder="Pesquisar..."
                onChangeText={setQuery}
                className="flex-1"
              />
              <Button
                icon={PlusIcon}
                className="justify-center items-center rounded-full border border-gray-300 w-10 h-10"
                onPress={() => setCreateSection(true)}
              />
            </View>

            <FlashList
              data={query && isFetching ? [] : data}
              refreshing={isLoading}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="px-3 mb-2"
                  activeOpacity={0.6}
                  onPress={() => handleSelect(item)}
                >
                  <View className="rounded py-1 px-3 bg-white border-b border-gray-300">
                    <Text className="line-clamp-1 flex-1">{item.name}</Text>
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
                refetch
              )}
              ListEmptyComponent={
                isEmpty ? (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text className="text-sm text-center max-w-[250px]">
                      {query
                        ? "Nenhuma secção encontrada"
                        : "Sem nenhuma secção cadastrado"}
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
          <View
            style={[
              createSection
                ? {
                    transform: [
                      {
                        translateX: 0,
                      },
                    ],
                  }
                : {
                    transform: [
                      {
                        translateX: 400,
                      },
                    ],
                  },
            ]}
            className="absolute transition-all inset-0"
          >
            <View className="flex flex-row items-center justify-between p-3 border-b border-b-gray-200">
              <View className="flex-row items-center gap-2">
                <Button
                  onPress={() => setCreateSection(false)}
                  icon={ArrowLeftIcon}
                />
                <Text className="font-bold">Nova secção</Text>
              </View>
              <Button onPress={handleClose} icon={XIcon} />
            </View>

            <View className="p-3">
              <Input
                readOnly={isSaving}
                placeholder="Titulo"
                className="mb-2"
                value={name}
                onChangeText={setName}
              />
              <Textarea
                readOnly={isSaving}
                placeholder="Descrição (opcional)"
                value={description}
                onChangeText={setDescription}
              />

              {error && (
                <Text className="text-xs text-red-500 mt-2">Erro: {error}</Text>
              )}
              <Button
                disabled={isSaving}
                onPress={handleSave}
                containerClassName="mt-4 "
                className="bg-blue-600 py-2 rounded-md h-10 justify-center items-center"
                textClassName="text-white text-center"
              >
                {isSaving ? (
                  <>
                    <ActivityIndicator size={12} color="#FFF" />
                  </>
                ) : (
                  "Guardar"
                )}
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
