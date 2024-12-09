import { useMemo, useState } from "react";
import { View } from "react-native";
import {
  ChevronLeftIcon,
  ChevronsLeftIcon,
  PlusIcon,
  ChevronRightIcon,
  ChevronsRightIcon,
} from "lucide-react-native";

import { cn } from "@/lib/utils";
import { dataTableListDataService } from "@/services/database";
import { useQueryPagination } from "@/hooks/use-query-pagination";

import { Text } from "./text";
import { LoadingPage } from "./loading";
import { Input } from "./input";
import { Button } from "./button";
import { FlashList } from "./flash-list";
import { SelectData } from "./select-data";

interface DataTableProps {
  table: { name: string; columns?: string } | null;
}

export function DataTableRender(props: DataTableProps) {
  const { table } = props;

  const [query, setQuery] = useState("");
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);

  const response = useQueryPagination({
    fn: () =>
      table
        ? dataTableListDataService(
            {
              table: table.name,
              columns: table.columns,
            },
            { page, size }
          )
        : undefined,
    queryKey: ["data-tables-data", page, size, table?.name],
  });

  const { columns, fieldId } = useMemo(() => {
    let fieldId = "";
    let columns: { title: string; name: string; pk: boolean }[] = [];

    if (table) {
      table?.columns?.split(";").forEach((column, index) => {
        if (index === 0) fieldId = column;
        columns.push({
          pk: index === 0,
          title: column.trim(),
          name: column.trim(),
        });
      });
    }

    return { columns, fieldId };
  }, [table]);

  if (!table) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center">Nenhuma tabela de dados selecionada</Text>
      </View>
    );
  }

  if (response.isLoading) {
    return <LoadingPage />;
  }

  const SIZES = [
    { number: 10, title: "Mostrar 10" },
    { number: 20, title: "Mostrar 20" },
    { number: 30, title: "Mostrar 30" },
    { number: 40, title: "Mostrar 40" },
    { number: 50, title: "Mostrar 50" },
  ];

  return (
    <>
      <View className="flex-row gap-2 items-center mb-4">
        <Input
          className="w-full flex-1"
          placeholder="Pesquisar..."
          onChangeText={setQuery}
        />
        <Button
          icon={PlusIcon}
          className="bg-white rounded-full w-10 h-10 justify-center items-center"
          // onPress={() => router.push("/settings/register-form/undefined")}
        />
      </View>

      <View className="border-b-gray-200 border-b p-2 bg-white rounded-t flex flex-row items-center">
        {columns.map((column, key) => (
          <Text
            key={key}
            className={cn(
              "font-bold uppercase text-sm",
              column.pk ? "w-10 text-center" : "flex-1 "
            )}
          >
            {column?.title || ""}
          </Text>
        ))}
      </View>

      <FlashList
        data={response.data}
        keyExtractor={(item) => String(item[fieldId])}
        renderItem={({ item, index }) => (
          <View key={index} className="p-2 flex flex-row items-center">
            {columns.map((column, key) => {
              return (
                <View key={key} className={cn("")}>
                  <Text
                    className={cn(
                      "text-xs",
                      column.pk ? "text-center w-10" : "flex-1"
                    )}
                  >
                    {item[column.name]}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
        ListFooterComponent={() => (
          <View className="rounded-b  flex flex-row items-center justify-between border-t-gray-200 border-t">
            <View className="py-2 pl-3">
              <Text className="text-xs">{`${response.totalItems} item(s)`}</Text>
            </View>
            <View className="py-2 pl-3">
              <SelectData
                labelField="title"
                data={SIZES}
                defaultValue={SIZES.find((s) => s.number === size)}
                placeholder="Mostrar 10"
                className="border-0 p-0 w-fit"
                containerClassName="p-0 flex-1 w-[1%] border-0"
                onSelect={(item) => {
                  setSize(item.number);
                }}
                dropdownWith={100}
              />
            </View>
            <View className="flex flex-row items-center py-2 pr-3">
              <Button
                icon={ChevronsLeftIcon}
                disabled={!response.prev}
                onPress={() => setPage(1)}
              />
              <Button
                icon={ChevronLeftIcon}
                disabled={!response.prev}
                onPress={() => setPage((prev) => prev - 1)}
              />
              <Text>{response.currentPage}</Text>
              <Text>/</Text>
              <Text>{response.totalPages}</Text>
              <Button
                icon={ChevronRightIcon}
                disabled={!response.next}
                onPress={() => setPage((prev) => prev + 1)}
              />
              <Button
                icon={ChevronsRightIcon}
                disabled={!response.next}
                onPress={() =>
                  response.totalPages && setPage(response.totalPages)
                }
              />
            </View>
          </View>
        )}
        ListEmptyComponent={
          response.isEmpty ? (
            <View
              style={{
                height: 200,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
              }}
            >
              <Text className="text-sm text-center max-w-[250px]">
                {query
                  ? "Nenhum dado encontrado"
                  : "Sem nenhum dado cadastrado"}
              </Text>
            </View>
          ) : null
        }
        contentContainerStyle={{ backgroundColor: "#fff" }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={32}
      />
    </>
  );
}
