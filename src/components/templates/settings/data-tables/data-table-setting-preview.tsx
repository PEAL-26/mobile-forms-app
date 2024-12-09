import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

import { ColumnType } from "./column";
import { DATABASE_COLUMNS_TYPE_ENUM } from "@/db/database";

interface Props {
  columns: ColumnType[];
}

export function DataTableSettingPreview(props: Props) {
  const { columns } = props;

  if (!columns.length) {
    return null;
  }

  return (
    <>
      <View className="border-b-gray-200 border-b p-2 bg-white rounded-t flex flex-row items-center">
        {columns
          .filter((f) => f.visible)
          .map((column, key) => (
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
      <View className="bg-white rounded-b">
        {Array.from({ length: 3 }).map((_, rowKey) => {
          return (
            <View key={rowKey} className="p-2 flex flex-row items-center">
              {columns
                .filter((f) => f.visible)
                .map((column, key) => {
                  const data = {
                    INTEGER: `${rowKey}`,
                    TEXT: `texto ${rowKey}`,
                    BLOB: "",
                    REAL: `${rowKey}.00`,
                    NUMERIC: `${rowKey}.00`,
                  }[column.dataType];

                  return (
                    <Text
                      key={key}
                      className={cn(
                        "text-sm",
                        column.pk ? "w-10 text-center" : "flex-1 "
                      )}
                    >
                      {data}
                    </Text>
                  );
                })}
            </View>
          );
        })}
      </View>
    </>
  );
}
