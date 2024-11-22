import {
  RefreshControl,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import {  useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { listFormsWithCountCollections } from "@/services/forms";
import { useQueryPagination } from "@/hooks/use-query-pagination";
import { FlashList, setFlashListLoader } from "@/components/ui/flash-list";
import { useRouter } from "expo-router";

export function ListingFormsWithCountCollections() {
  const router = useRouter();
  const window = useWindowDimensions();

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
    fn: ({ page }) =>
      listFormsWithCountCollections({ page, query: debouncedQuery }),
    queryKey: ["forms_with_count_collections", debouncedQuery],
  });

  return (
    <>
      {/* Barra de Pesquisa */}
      <View className="px-3 py-3">
        <Input
          placeholder="Pesquisar..."
          style={{ borderWidth: 0, borderColor: "transparent" }}
          onChangeText={setQuery}
        />
      </View>

      <FlashList
        data={query && isFetching ? [] : data}
        refreshing={isLoading}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="px-3"
            activeOpacity={0.6}
            onPress={() => router.push(`/(app)/forms/${String(item.id)}`)}
          >
            <View className="flex-row items-center justify-between gap-5 bg-white shadow rounded-md py-2 px-3 h-20">
              <View className="flex-1">
                <Text className="font-bold text-base line-clamp-1 flex-1">
                  {item.name}
                </Text>
                <Text className="text-xs line-clamp-2 text-gray-500 flex-1">
                  {item.description ?? "S/N"}
                </Text>
              </View>
              <Text className="font-bold text-base">
                {item.collections ?? "0"}
              </Text>
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
    </>
  );
}
