import { AddFormModal } from "@/components/modals/add-form-modal";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

export function SettingFormListing() {
  const [openAddForm, setOpenAddForm] = useState(false);
  return (
    <>
      <TabsContent value="forms">
        <Button
          icon={PlusIcon}
          className="bg-white rounded-full w-10 h-10 justify-center items-center"
          onPress={() => setOpenAddForm(true)}
        />
        {/* <DataTable
        // columns={[
        //   {
        //     name: "name",
        //     title: "Nome",
        //     render: (data) => ({ row: <>{data.name}</> }),
        //   },
        // ]}
        // response={{
        //   data: Array.from({ length: 50 }).map((_, index) => ({
        //     id: index + 1,
        //     name: `Teste ${index + 1}`,
        //   })),
        // }}
      /> */}
      </TabsContent>

      <AddFormModal open={openAddForm} onClose={setOpenAddForm} />
    </>
  );
}

// function columns:Column<{}>[] = []
