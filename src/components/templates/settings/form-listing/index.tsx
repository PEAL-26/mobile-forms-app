import {
  RefreshControl,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useDebounce } from "@uidotdev/usehooks";
import { Edit2Icon, PlusIcon, TrashIcon } from "lucide-react-native";

import { Text } from "@/components/ui/text";
import { listForms } from "@/services/forms";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQueryPagination } from "@/hooks/use-query-pagination";
import { FlashList, setFlashListLoader } from "@/components/ui/flash-list";
import { SettingsFormDetailsModal } from "@/components/modals/settings-form-details-modal";
import { useRemove } from "@/hooks/use-remove";
import { Loading } from "@/components/ui/loading";

export function SettingFormListing() {
  const router = useRouter();
  const window = useWindowDimensions();

  const [openDetails, setOpenDetails] = useState(false);
  const [formId, setFormId] = useState<number | undefined>();

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
    queryKey: ["settings_forms", debouncedQuery],
  });

  const remove = useRemove({
    tableName: "forms",
    queryKey: ["settings_forms", debouncedQuery],
    refetch,
  });

  return (
    <>
      {/* Body */}
      <View className="px-3 py-3 flex-row gap-2 items-center">
        <Input
          className="w-full flex-1"
          placeholder="Pesquisar..."
          onChangeText={setQuery}
        />
        <Button
          icon={PlusIcon}
          className="bg-white rounded-full w-10 h-10 justify-center items-center"
          onPress={() => router.push("/settings/register-form/undefined")}
        />
      </View>

      <FlashList
        data={query && isFetching ? [] : data}
        refreshing={isLoading}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="px-3"
            style={{ marginBottom: 8 }}
            activeOpacity={0.6}
            onPress={() => {
              setOpenDetails(true);
              setFormId(item.id);
            }}
          >
            <View className="rounded  bg-white shadow-black flex-row items-center justify-between gap-3">
              <View className="py-3 pl-3 flex-1">
                <Text className="line-clamp-1 flex-1">{item.name}</Text>
              </View>
              <View className="flex-row items-center justify-end gap-2 h-full w-20">
                <Button
                  icon={() => (
                    <Edit2Icon
                      size={20}
                      color="#000"
                      onPress={() =>
                        router.push(`/settings/register-form/${item.id}`)
                      }
                    />
                  )}
                  containerClassName="flex-1 w-full h-full  justify-center items-center"
                />
                <Button
                  containerClassName="w-full h-full flex-1 justify-center items-center"
                  icon={() => (
                    <TrashIcon
                      size={20}
                      color="red"
                      onPress={() => remove.handleRemove({ id: item.id })}
                    />
                  )}
                />
              </View>
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
        ListFooterComponent={setFlashListLoader(isFetching, isError, refetch, {
          height: data.length === 0 ? window.height - 80 : undefined,
        })}
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

      <SettingsFormDetailsModal
        formId={formId}
        open={openDetails}
        onClose={() => {
          setOpenDetails(false);
          setFormId(undefined);
        }}
      />

      <Loading show={remove.isLoading} />
    </>
  );
}
