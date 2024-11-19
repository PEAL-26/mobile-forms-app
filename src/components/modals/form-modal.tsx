import { Modal, Text, TextInput, View } from "react-native";
import { XIcon } from "lucide-react-native";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Props<T> {
  title?: string;
  onSubmit?(data: T): void;
  open?: boolean;
  onClose?(state: false): void;
}

export function FormModal<T>(props: Props<T>) {
  const { open, onClose, onSubmit, title = "Modal" } = props;

  const handleClose = () => {
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
        <View className="rounded-md bg-white shadow overflow-hidden">
          {/* Header */}
          <View className="flex flex-row items-center justify-between p-3 border-b border-b-gray-200">
            <Text className="font-bold">{title}</Text>
            <Button onPress={handleClose} icon={XIcon} />
          </View>

          {/* Body */}
          <View className="flex-1 p-3">
            <Input placeholder="Pesquisar" />
            <Button>Guardar</Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}
