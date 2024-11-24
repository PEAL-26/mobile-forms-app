import { RefreshControl, View } from "react-native";
import { ArrowLeftIcon, PlusIcon } from "lucide-react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";

import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { LoadingPage } from "@/components/ui/loading";
import { FlashList } from "@/components/ui/flash-list";
import { useQueryPagination } from "@/hooks/use-query-pagination";
import { ErrorPage, NotFoundPage } from "@/components/ui/page-errors";
import { listDataCollectionsByIdentifier } from "@/services/data-collections";
import { Label } from "@/components/ui/label";
import { SeparatorWithLabel } from "@/components/ui/separator";

export default function DataCollectDetailsScreen() {
  const params = useGlobalSearchParams<{ identifier: string }>();
  const router = useRouter();

  const { data, isLoading, isError, refetch, loadNextPageData } =
    useQueryPagination({
      fn: ({ page }) =>
        listDataCollectionsByIdentifier({
          page,
          identifier: params.identifier,
        }),
      queryKey: ["data_collection_details", params.identifier],
    });

  if (isLoading) {
    return <LoadingPage backgroundColor="transparent" color="#000" />;
  }

  if (isError) {
    return <ErrorPage refetch={refetch} />;
  }

  if (!isLoading && !isError && data.length === 0) {
    return <NotFoundPage title="Dados não encontrado!" refetch={refetch} />;
  }

  var lastSection = "";
  var showSection = false;

  return (
    <View className="relative flex-1">
      {/* Header */}
      <View className="flex-row flex items-center w-full justify-between  bg-white gap-3 border-b border-b-gray-200 elevation-lg p-3 h-16">
        <View className="flex-row flex items-center gap-3">
          <Button icon={ArrowLeftIcon} onPress={() => router.back()} />
          <Text className="font-bold text-lg">Dados Coletados</Text>
        </View>
      </View>

      <View className="flex-1 pt-4">
        <FlashList
          data={data}
          refreshing={isLoading}
          renderItem={({ item }) => {
            if (!item.field?.section?.name) {
              showSection = false;
            } else {
              if (lastSection !== item.field?.section?.name) {
                lastSection = item.field?.section?.name ?? "";
                showSection = true;
              } else {
                showSection = false;
              }
            }

            return (
              <>
                {showSection && (
                  <View className="my-5">
                    <SeparatorWithLabel
                      label={item.field?.section?.name}
                      className="my-0"
                    />
                    {item.field?.section?.description && (
                      <Text className="text-xs text-gray-500">
                        {item.field?.section?.description}
                      </Text>
                    )}
                  </View>
                )}
                <View style={{ paddingHorizontal: 12, paddingBottom: 12 }}>
                  <Label>{item.field.display}</Label>
                  <Text>{item.value}</Text>
                </View>
              </>
            );
          }}
          keyExtractor={(item: any) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refetch}
              colors={["#000", "#FFF"]}
            />
          }
          ListFooterComponentStyle={{ paddingVertical: 16 }}
          estimatedItemSize={80}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          onEndReached={loadNextPageData}
        />
      </View>
    </View>
  );
}
