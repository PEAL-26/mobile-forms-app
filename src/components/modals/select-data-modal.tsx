import {
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal } from "react-native";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

type ItemType = {
  id: string;
  title: string;
};

interface SelectDataModalProps<T extends ItemType> {
  data: T[];
  onSelect?(data: T | null): void;
  open?: boolean;
  onClose?(state: false): void;
}

export function SelectDataModal<T extends ItemType>(
  props: SelectDataModalProps<T>
) {
  const { open, onClose, data, onSelect } = props;
  const [isLoading, setIsLoading] = useState(true);

  const handleClose = () => {
    onClose?.(false);
  };

  const handleSelect = (item: T) => {
    onSelect?.(item);
    handleClose()
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <Modal
      visible={open}
      onRequestClose={handleClose}
      transparent
      statusBarTranslucent
      animationType="fade"
    >
      <Pressable
        onPress={handleClose}
        className="flex-1 justify-center items-center bg-black/50 p-10"
      >
        <View className="relative rounded-md bg-white shadow overflow-hidden w-full h-80">
          {data.length === 0 && (
            <View className="flex-1 justify-center items-center">
              <Text>Sem nenhum item</Text>
            </View>
          )}
          {isLoading && (
            <View className="flex-1 flex-row justify-center items-center">
              <ActivityIndicator color="#000" size="small" />
            </View>
          )}

          {!isLoading && data.length > 0 && (
            <>
              <View className="absolute top-0 left-0 right-0 z-20 px-3 pt-3 bg-white">
                <Input placeholder="Pesquisar..." className="" />
              </View>
              <FlatList
                ListHeaderComponent={() => <View className="h-14" />}
                data={data}
                renderItem={({ item }) =>
                  renderItem({ item, onPress: handleSelect })
                }
                contentContainerStyle={{ paddingLeft: 12, paddingRight: 12 }}
              />
            </>
          )}
        </View>
      </Pressable>
    </Modal>
  );
}

type RenderItemProps<T extends ItemType> = {
  item: T;
  onPress?(item: T): void;
};

function renderItem<T extends ItemType>(props: RenderItemProps<T>) {
  const { item, onPress } = props;
  return (
    <TouchableOpacity
      className="h-8 bg-white border-b border-gray-300 mb-2 flex-row items-center"
      onPress={() => onPress?.(item)}
    >
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );
}
