import { RefreshControl, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useGlobalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeftIcon,
  Edit2Icon,
  PlusIcon,
  TrashIcon,
} from "lucide-react-native";

import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { getFormByIdService } from "@/services/forms";
import { Loading, LoadingPage } from "@/components/ui/loading";
import { SeparatorWithLabel } from "@/components/ui/separator";
import { FlashList, setFlashListLoader } from "@/components/ui/flash-list";
import { listDataCollectionsGroupByFormId } from "@/services/data-collections";
import { useQueryPagination } from "@/hooks/use-query-pagination";
import { useWindowDimensions } from "react-native";
import { useEffect, useState } from "react";
import { useRemove } from "@/hooks/use-remove";

export default function FormDetailsScreen() {
  const params = useGlobalSearchParams<{ form_id: string }>();
  const router = useRouter();
  const window = useWindowDimensions();

  const [isLoadingPage, setIsLoadingPage] = useState(true);

  const {
    data: form,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getFormByIdService(Number(params.form_id)),
    queryKey: ["forms_with_count_collections", params.form_id],
  });

  const dataCollection = useQueryPagination({
    fn: ({ page }) =>
      form
        ? listDataCollectionsGroupByFormId({ page, formId: form.id })
        : undefined,
    queryKey: ["data-collection-group-by-form", form?.id],
  });

  const remove = useRemove({
    tableName: "data_collection",
    queryKey: [
      "forms_with_count_collections",
      params.form_id,
      "data-collection-group-by-form",
    ],
    refetch: () => {
      refetch();
      dataCollection.refetch();
    },
  });

  useEffect(() => {
    setIsLoadingPage(false);
  }, []);

  if (isLoading || isLoadingPage) {
    return <LoadingPage backgroundColor="transparent" color="#000" />;
  }

  if (!form) {
    return null;
  }

  return (
    <View className="relative flex-1">
      {/* Header */}
      <View className="flex-row flex items-center w-full justify-between  bg-white gap-3 border-b border-b-gray-200 elevation-lg p-3 h-16">
        <View className="flex-row flex items-center gap-3">
          <Button icon={ArrowLeftIcon} onPress={() => router.push("/(app)")} />
          <Text className="font-bold text-lg">Detalhes do Formulário</Text>
        </View>
        <Button
          icon={PlusIcon}
          onPress={() => router.push(`/(app)/collect-data/${params.form_id}`)}
        />
      </View>
      <View className="px-3 pt-3">
        <View className="bg-white rounded-md p-3 gap-2">
          <Text className="font-bold text-base">{form.name}</Text>
          <Text className="text-xs text-gray-500">{form.description}</Text>
        </View>
        <SeparatorWithLabel
          label={`Dados (${form?.collections ?? 0})`}
          className="my-0 mt-5 mb-0"
        />
      </View>

      <FlashList
        data={dataCollection?.isFetching ? [] : dataCollection.data}
        refreshing={isLoading}
        renderItem={({ item }) => (
          <Button
            style={{ paddingLeft: 12, paddingRight: 12 }}
            onPress={() =>
              router.push(`/forms/collect-data/${item.identifier}`)
            }
          >
            <View className="bg-white rounded mt-3 flex-row items-center justify-between gap-3 overflow-hidden">
              <View className=" p-3">
                <Text className="font-bold line-clamp-1">
                  {new Date(item.updatedAt).toLocaleString()}
                </Text>
              </View>
              <View className="flex-row items-center justify-end gap-2 h-full w-20">
                {/* <Button
                  icon={() => (
                    <Edit2Icon
                      size={20}
                      color="#000"
                      // onPress={() => router.push(`/(app)/collect-data/${}`)}
                    />
                  )}
                  containerClassName="flex-1 w-full h-full  justify-center items-center"
                /> */}
                <Button
                  containerClassName="w-full h-full flex-1 justify-center items-center"
                  icon={() => (
                    <TrashIcon
                      size={20}
                      color="red"
                      onPress={() =>
                        remove.handleRemove({ identifier: item.identifier })
                      }
                    />
                  )}
                />
              </View>
            </View>
          </Button>
        )}
        keyExtractor={(item: any) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={dataCollection.isLoading}
            onRefresh={dataCollection.refetch}
            colors={["#000", "#FFF"]}
          />
        }
        ListFooterComponent={setFlashListLoader(
          dataCollection.isFetching,
          dataCollection.isError,
          refetch,
          {
            height:
              dataCollection.data.length === 0
                ? window.height - 280
                : undefined,
          }
        )}
        ListEmptyComponent={
          dataCollection.isEmpty ? (
            <View
              style={{
                height: window.height - 280,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text className="text-sm text-center">Sem dados coletados!</Text>
            </View>
          ) : null
        }
        ListFooterComponentStyle={{ paddingVertical: 16 }}
        estimatedItemSize={80}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        onEndReached={dataCollection.loadNextPageData}
      />

      <Loading show={remove.isLoading} />
    </View>
  );
}
