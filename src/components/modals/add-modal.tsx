import { Modal, Text, TextInput, View } from "react-native";
import { Button } from "../ui/button";

interface Props<T> {
  title?: string;
  onSubmit?(data: T): void;
  open?: boolean;
  onClose?(state: false): void;
}

export function AddModal<T>(props: Props<T>) {
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
      <View className="flex-1 bg-black/50">
        <View className="rounded-md bg-white shadow overflow-hidden">
          {/* Header */}
          <View className="flex items-center justify-between">
            <Text className="font-bold">{title}</Text>
            <Button onPress={handleClose}>Fechar</Button>
          </View>

          {/* Body */}
          <View className="flex-1">
            <TextInput placeholder="Descrição" />
            <Button>Guardar</Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}
