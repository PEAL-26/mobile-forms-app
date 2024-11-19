import { ReactNode } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { Text } from "./text";
import { cn } from "@/lib/utils";

export type Column<T> = {
  name: keyof T;
  title?: string;
  className?: string;
  render?: (data: T) => { className?: string; row: ReactNode };
};

export type ResponseData<T> = {
  data: T[];
  isLoading?: boolean;
  isError?: boolean;
};

interface Props<T = { id: string }> {
  fieldId?: keyof T;
  columns: Column<T>[];
  response: ResponseData<T>;
}

export function DataTable<T>(props: Props<T>) {
  const { response, columns, fieldId = "id" as keyof T } = props;

  return (
    <>
      {/* <View className="bg-white rounded flex-1"> */}
      <View className="border-b-gray-200 border-b p-2 bg-white rounded-t">
        {columns.map((column, key) => (
          <Text
            key={key}
            className={cn("font-bold uppercase text-sm", column?.className)}
          >
            {column?.title || ""}
          </Text>
        ))}
      </View>

      <FlatList
        data={response.data}
        keyExtractor={(item) => String(item[fieldId])}
        renderItem={({ item, index, separators }) => (
          <View key={index} className="p-2">
            {columns.map((column, key) => {
              const { row, className } = column?.render?.(item) ?? {
                row: <>{item[column.name]}</>,
              };

              return (
                <View key={key} className={cn("", column?.className)}>
                  <Text className={cn("text-xs", className)}>{row}</Text>
                </View>
              );
            })}
          </View>
        )}
        contentContainerStyle={{ backgroundColor: "#fff" }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      {/* </View> */}
    </>
  );
}
