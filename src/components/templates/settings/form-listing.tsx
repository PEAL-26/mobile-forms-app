import { useRouter } from "expo-router";
import { PlusIcon } from "lucide-react-native";

import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";

export function SettingFormListing() {
  const router = useRouter();

  return (
    <>
      <TabsContent value="forms">
        <Button
          icon={PlusIcon}
          className="bg-white rounded-full w-10 h-10 justify-center items-center"
          onPress={() => router.navigate("/settings/register-form/undefined")}
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
    </>
  );
}

// function columns:Column<{}>[] = []
