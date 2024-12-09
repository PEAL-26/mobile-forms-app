import { useState } from "react";
import { View } from "react-native";
import { CogIcon } from "lucide-react-native";

import { Button } from "@/components/ui/button";
import { listTableService } from "@/services/database";
import { useQueryPagination } from "@/hooks/use-query-pagination";
import { DataTableRender } from "@/components/ui/data-table-render";
import { SelectData } from "@/components/ui/select-data";
import { SeparatorWithLabel } from "@/components/ui/separator";

export function SettingDataTablesListing() {
  const [dataTableSelected, SetDataTableSelected] = useState<{
    name: string;
    columns?: string;
  } | null>(null);

  const { data } = useQueryPagination({
    fn: () => listTableService(),
    queryKey: ["data-tables"],
  });

  return (
    <>
      <View className="flex-1 px-3">
        <View className="flex flex-row items-center gap-2">
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
          <Button
            className="w-10 h-10 bg-white rounded-full justify-center items-center"
            icon={CogIcon}
            iconColor="#000"
            iconSize={20}
          />
        </View>
        <SeparatorWithLabel label={dataTableSelected?.name || "S/N"} />
        <DataTableRender table={dataTableSelected} />
      </View>
    </>
  );
}
