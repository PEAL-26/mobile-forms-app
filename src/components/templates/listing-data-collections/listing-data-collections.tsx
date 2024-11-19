import { Input } from "@/components/ui/input";
import { ScrollView, View } from "react-native";
import {
  PlusIcon,
  DownloadIcon,
  CogIcon,
  PencilIcon,
} from "lucide-react-native";

export function ListingDataCollections() {
  return (
    <>
      {/* Barra de Pesquisa */}
      <View className="px-3 py-1">
        <Input
          placeholder="Pesquisar..."
          //   className="ring-0 ring-offset-0 border-0 p-1"
          style={{ borderWidth: 0, borderColor: "transparent" }}
        />
      </View>

      <ScrollView className="px-3 pt-3">
        <View className="mb-[112px] gap-3 flex flex-col">
          {/* {DATA.map((item) => (
          <View
            key={item.id}
            className="p-2 pr-3 shadow-inherit rounded bg-white flex flex-row items-center justify-between"
          >
            <View>
              <Text className="font-bold text-base">{item.province}</Text>
              <Text className="font-normal text-sm">{item.province}</Text>
            </View>

            <Button icon={PencilIcon} iconClassName="size-4" />
          </View>
        ))} */}
        </View>
      </ScrollView>
    </>
  );
}
