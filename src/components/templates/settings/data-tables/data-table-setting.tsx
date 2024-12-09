import { useState } from "react";
import { ScrollView, View } from "react-native";
import { PlusIcon } from "lucide-react-native";

import { SeparatorWithLabel } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Column, ColumnType } from "./column";
import { DataTableSettingPreview } from "./data-table-setting-preview";
import { DATABASE_COLUMNS_TYPE_ENUM } from "@/db/database";

export function DataTableSetting() {
  const [columns, setColumns] = useState<ColumnType[]>([]);

  const handleAddColumn = () => {
    setColumns((prev) => [
      ...prev,
      { name: "", title: "", dataType: DATABASE_COLUMNS_TYPE_ENUM.TEXT },
    ]);
  };

  const handleChangeColumn = (data: ColumnType, index: number) => {
    const newData = columns.map((column, i) => {
      if (i === index) {
        return { ...data };
      }

      return { ...column };
    });
    setColumns(newData);
  };

  const handleRemove = (index: number) => {
    const newColumns = columns.filter((c, i) => {
      console.log({ name: c.name, i, index });
      return i !== index;
    });

    console.log(newColumns);
    setColumns(newColumns);
  };

  return (
    <ScrollView>
      <View className="px-3">
        <SeparatorWithLabel label="Colunas" />

        <View className="flex-col gap-3">
          {columns.map((column, index) => (
            <Column
              key={index}
              defaultData={column}
              onChange={(data) => handleChangeColumn(data, index)}
              onRemove={() => handleRemove(index)}
            />
          ))}
        </View>

        <Button
          icon={PlusIcon}
          className="flex-row items-center gap-3 justify-center p-2 bg-white rounded border border-gray-200"
          containerClassName="mt-5"
          onPress={handleAddColumn}
        >
          Adicionar Coluna
        </Button>
        <SeparatorWithLabel label="Pré-visualização" />
        <DataTableSettingPreview columns={columns} />
      </View>
    </ScrollView>
  );
}
