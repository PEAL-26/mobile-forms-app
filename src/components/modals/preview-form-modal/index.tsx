import { Modal, Text, View } from "react-native";
import {  XIcon } from "lucide-react-native";
import { Button } from "../../ui/button";

interface Props {
  fields: any
  open?: boolean;
  onClose?(state: false): void;
}

export function PreviewFormModal(props: Props) {
  const { open, onClose } = props;

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
        <View className="flex-1 rounded-md bg-white shadow overflow-hidden w-full">
          {/* Header */}
          <View className="flex flex-row items-center justify-between p-3 border-b border-b-gray-200">
            <Text className="font-bold">Adicionar formulário</Text>
            <Button onPress={handleClose} icon={XIcon} />
          </View>

          {/* Body */}
   
        </View>
      </View>
    </Modal>
  );
}
