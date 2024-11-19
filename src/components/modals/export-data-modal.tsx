import { Modal, Text, View } from "react-native";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react-native";
import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { exportToExcel } from "@/helpers/xlsx";

interface Props {
  open?: boolean;
  onClose?(state: false): void;
}

export function ExportDataModal(props: Props) {
  const { open, onClose } = props;
  const [start, setStart] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isError, setIsError] = useState();

  const handleClose = () => {
    if (start) return;
    onClose?.(false);
  };

  const handleExportDataStart = async () => {
    // if (start) return;
    // setStart(true);

    try {
      const data = exportToExcel([
        { id: 1, name: "João" },
        { id: 2, name: "Paulo" },
      ]);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
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
        <View className="rounded-md bg-white shadow overflow-hidden w-full h-80">
          {/* Header */}
          <View className="flex flex-row items-center justify-between p-3 border-b border-b-gray-200">
            <Text className="font-bold">Exportar (EXCEL)</Text>
            <Button icon={XIcon} onPress={handleClose} />
          </View>

          <View className="flex-1 flex-row justify-center items-center">
            <Button
              disabled={start}
              onPress={handleExportDataStart}
              className="w-[120px] h-[120px] border rounded-full justify-center items-center border-gray-300"
            >
              {start ? String(`${progress}%`) : "Inicial"}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}
