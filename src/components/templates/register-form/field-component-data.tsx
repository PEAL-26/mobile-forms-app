import { View } from "react-native";
import { memo, useMemo, useState } from "react";
import { DatabaseIcon, PlusCircleIcon, TrashIcon } from "lucide-react-native";

import { DATA_TYPE_ENUM, FIELD_TYPE_ENUM } from "@/db";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroupArray } from "@/components/ui/render-component/utils/radio-array";

import { FieldComponentCondicional } from "./field-component-conditional";

export type FieldComponentDataType = {
  type: DATA_TYPE_ENUM;
  src: string;
};

type DefaultData = {
  data?: FieldComponentDataType;
  dataWhere?: any;
  extraField?: any;
};

interface Props {
  type: FIELD_TYPE_ENUM;
  defaultData?: DefaultData;
  onUpdate?(data: FieldComponentDataType): void;
  onOpenDataTableModal?(): void;
}

const DATA_TYPES = ["radio", "checkbox", "select"];

export const FieldComponentData = memo((props: Props) => {
  const { type, onUpdate, onOpenDataTableModal, defaultData } = props;

  const defaultDataMemo = useMemo(() => {
    return defaultData;
  }, [defaultData]);

  const [dataType, setDataType] = useState<DATA_TYPE_ENUM | undefined>(() => {
    if (defaultDataMemo?.data?.type) return defaultDataMemo.data.type;

    return DATA_TYPE_ENUM.list;
  });

  const [list, setList] = useState<{ id: number; title: string }[]>(() => {
    if (defaultDataMemo?.data?.type === DATA_TYPE_ENUM.list) {
      const data = JSON.parse(defaultDataMemo?.data?.src);
      return data;
    }

    return [{ id: 1, title: "Lista 1" }];
  });

  const [dataTableSource, setDataTableSource] = useState(() => {
    if (defaultDataMemo?.data?.type === DATA_TYPE_ENUM.data_table) {
      return defaultDataMemo?.data?.src;
    }

    return "";
  });

  if (!DATA_TYPES.includes(type)) return null;

  const handleChangeType = (type: DATA_TYPE_ENUM) => {
    setDataType(type as any);
    let src = "";
    if (type === DATA_TYPE_ENUM.list) {
      src = JSON.stringify(list);
    }

    if (type === DATA_TYPE_ENUM.data_table) {
      src = dataTableSource;
    }
    onUpdate?.({ type, src });
  };

  const handleAddList = () => {
    const latList = list.slice(-1);
    const id = (latList[0]?.id ?? 0) + 1;
    const newData = [...list, { id, title: `Lista ${id}` }];
    setList(newData);

    if (dataType === DATA_TYPE_ENUM.list) {
      onUpdate?.({ type: dataType, src: JSON.stringify(newData) });
    }
  };

  const handleRemoveList = (id: number) => {
    const newData = list.filter((p) => p.id !== id);
    setList(newData);

    if (dataType === DATA_TYPE_ENUM.list) {
      onUpdate?.({ type: dataType, src: JSON.stringify(newData) });
    }
  };

  return (
    <>
      <RadioGroupArray
        data={[
          { value: "list", label: "Lista" },
          { value: "data_table", label: "Tabela de dados" },
        ]}
        defaultValue={defaultDataMemo?.data?.type || "list"}
        onChange={(p) => p?.value && handleChangeType(p?.value as any)}
      />

      {dataType === DATA_TYPE_ENUM.list && (
        <View className="flex-col items-center gap-3">
          <View className="flex-col gap-1">
            {list.map((data, index) => (
              <View
                key={String(index)}
                className="flex-row items-center gap-2 w-full"
              >
                <Input
                  placeholder="Lista"
                  value={data.title}
                  className="h-7 w-full p-0 px-2 flex-1"
                  onChangeText={(text) =>
                    setList((prev) => {
                      const foundIndex = prev.findIndex(
                        (p) => p.id === data.id
                      );
                      if (foundIndex > -1) {
                        prev[foundIndex].title = text;
                      }

                      return [...prev];
                    })
                  }
                />
                <Button
                  icon={TrashIcon}
                  iconColor="#ef4444"
                  onPress={() => handleRemoveList(data.id)}
                />
              </View>
            ))}
          </View>
          <Button icon={PlusCircleIcon} onPress={handleAddList} />
        </View>
      )}

      {dataType === DATA_TYPE_ENUM.data_table && (
        <View className="flex-row items-center gap-2">
          <Input placeholder="Tabela (campos)" readOnly className="flex-1" />
          <Button icon={DatabaseIcon} onPress={onOpenDataTableModal} />
        </View>
      )}

      <Button
        className="bg-white rounded-md py-2 mt-4"
        textClassName="text-center"
      >
        Filtros
      </Button>
      <Text className="text-sm">{/* Descrição do filtro: ex.: */}</Text>
      <FieldComponentCondicional />
    </>
  );
});

FieldComponentData.displayName = "FieldComponentData";
