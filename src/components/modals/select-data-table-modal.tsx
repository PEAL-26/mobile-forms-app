import { useState } from "react";
import { XIcon } from "lucide-react-native";
import { Modal, Text, View } from "react-native";

import { useQuery } from "@tanstack/react-query";
import { useQueryPagination } from "@/hooks/use-query-pagination";
import { getInfoTableService, listTableService } from "@/services/database";

import { Button } from "../ui/button";
import { DropdownDataTable } from "../ui/dropdown-data-table";

interface Props {
  open?: boolean;
  onClose?(state: false): void;
}

export function SelectDataTableModal(props: Props) {
  const { open, onClose } = props;

  const [tableName, setTableName] = useState("");

  const handleClose = () => {
    onClose?.(false);
  };

//   const { data } = useQueryPagination({
//     fn: ({ page }) => listTableService({ page }),
//     queryKey: ["data_tables"],
//   });

//   const {
//     data: dataTableInfo,
//     isLoading: dataTableIsLoading,
//     isFetching: dataBaseIsFetching,
//   } = useQuery({
//     queryFn: () => {
//       if (tableName) {
//         return getInfoTableService(tableName);
//       }
//       return null;
//     },
//     queryKey: [tableName],
//   });

  return (
    <Modal
      visible={open}
      onRequestClose={handleClose}
      transparent
      statusBarTranslucent
      animationType="fade"
    >
      <View className="flex-1 justify-center items-center bg-black/50 p-10">
        <View className="relative rounded-md bg-white shadow overflow-hidden h-[400px] w-full">
          {/* Header */}
          <View className="flex flex-row items-center justify-between p-3 border-b border-b-gray-200">
            <Text className="font-bold">Tabela de Dados</Text>
            <Button /*onPress={handleClose}*/ icon={XIcon} />
          </View>

          <View className="flex-1 items-center justify-center">
            <Text className="text-centerF">Em Desenvolvimento</Text>
          </View>

          {/* <DropdownDataTable /> */}
          {/* Body */}
          {/* <View className="flex-1">
            <TextInput placeholder="Descrição" />
            <Button>Guardar</Button>
          </View> */}
        </View>
      </View>
    </Modal>
  );
}
