import { View, Modal, ScrollView } from "react-native";
import { useState } from "react";
import { XIcon } from "lucide-react-native";
import { useQuery } from "@tanstack/react-query";

import { useQueryPagination } from "@/hooks/use-query-pagination";
import { getInfoTableService, listTableService } from "@/services/database";

import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { SelectData } from "../ui/select-data";
import { DATABASE_COLUMNS_TYPE_ENUM } from "@/db/database";
import { Input } from "../ui/input";

type Field = {
  name: string;
  dataType: DATABASE_COLUMNS_TYPE_ENUM;
};

export type FK = {
  table: string;
  field: string;
  reference: Field;
  display: Field;
};

interface Props {
  defaultData?: FK;
  open?: boolean;
  onClose?(state: false): void;
  onApply?(fk: Partial<FK>): void;
}

export function ForeignKeyModal(props: Props) {
  const { defaultData, open, onClose, onApply } = props;

  const [dataTableSelected, SetDataTableSelected] = useState<{
    name: string;
    columns?: string;
  } | null>(null);

  const { data } = useQueryPagination({
    fn: () => listTableService(),
    queryKey: ["data-tables"],
  });

  const { data: tableInfo } = useQuery({
    queryFn: () =>
      dataTableSelected?.name
        ? getInfoTableService(dataTableSelected?.name)
        : null,
    queryKey: ["table", dataTableSelected?.name],
  });

  const [fk, setFk] = useState<Omit<Partial<FK>, "table">>({});
  const [field, setField] = useState("");

  const dataTableInfo =
    tableInfo?.map((table) => {
      return {
        id: table.cid,
        name: `${table.name} -> ${table.type} ${
          table.notnull ? "not null" : ""
        } ${table.pk ? "pk" : ""}`,
        field: table.name,
        type: table.type as DATABASE_COLUMNS_TYPE_ENUM,
      };
    }) || [];

  const handleClose = () => {
    onClose?.(false);
  };

  const [error, setError] = useState<string | null>(null);

  const handleApply = () => {
    if (!dataTableSelected) {
      setError("Selecione uma tabela");
      return;
    }
    if (!fk?.reference || !fk?.display) {
      setError("Selecione a referência e o display");
      return;
    }

    setError(null);
    onApply?.({ table: dataTableSelected.name, field, ...fk });
    onClose?.(false);
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
        <View className="rounded-md bg-white shadow overflow-hidden  w-full">
          {/* Header */}
          <View className="flex flex-row items-center justify-between p-3 border-b border-b-gray-200">
            <Text className="font-bold">Relacionamento de tabela</Text>
            <Button onPress={handleClose} icon={XIcon} />
          </View>

          {/* Body */}
          <ScrollView>
            <View className="flex-row justify-center items-center flex-1">
              <View className="px-3 py-3 gap-3 flex-col flex-wrap">
                <SelectData
                  data={data}
                  placeholder="Selecione uma tabela"
                  onSelect={(item) => {
                    if (item) {
                      SetDataTableSelected(item);
                    } else {
                      SetDataTableSelected(null);
                    }
                  }}
                  className="flex-1"
                  search
                />
                <Input placeholder="Campo" onChangeText={setField} />
                <SelectData
                  data={dataTableInfo || []}
                  placeholder="Referência"
                  onSelect={(item) => {
                    setFk((prev) => ({
                      ...prev,
                      reference: { name: item.field, dataType: item.type },
                    }));
                  }}
                  className="flex-1"
                  search
                />
                <SelectData
                  data={dataTableInfo || []}
                  placeholder="Display"
                  onSelect={(item) => {
                    setFk((prev) => ({
                      ...prev,
                      display: { name: item.field, dataType: item.type },
                    }));
                  }}
                  className="flex-1"
                  search
                />
                {error && <Text className="text-xs text-red-500">{error}</Text>}
              </View>
            </View>
          </ScrollView>
          <View className="flex-row items-center justify-end gap-3 p-3">
            <Button
              className="bg-blue-600 w-24 justify-center items-center rounded-md py-2"
              textClassName="text-center text-white"
              onPress={handleApply}
            >
              Aplicar
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}
