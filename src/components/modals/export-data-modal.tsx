import { useState } from "react";
import { Modal, PermissionsAndroid, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { XIcon } from "lucide-react-native";
import * as Linking from "expo-linking";
import { File, Paths } from "expo-file-system/next";

import { exportToExcel } from "@/helpers/xlsx";
import { ensureDirExists,  moveTo, writeFile } from "@/helpers/file";
import { Button } from "../ui/button";
import { db } from "@/db";

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

    let isPermittedExternalStorage = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );

    if (!isPermittedExternalStorage) {
      // Ask for permission
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Permission Granted (calling our exportDataToExcel function)
        // exportDataToExcel();
        console.log("Permission granted");
      } else {
        // Permission denied
        console.log("Permission denied");
      }
    }

    try {
      const response = await db.listAll("data_collection");
      const data = await exportToExcel(response, "data_collection");
      const directoryPath = await ensureDirExists("mobile-forms-exports");
      const fileName = `exported-${Date.now()}.xlsx`;
      const filePath = `${directoryPath}/${fileName}`;
      await writeFile(filePath, data, FileSystem.EncodingType.Base64);

      //       // const to = FileSystem.documentDirectory
      //       //   ? `${FileSystem.documentDirectory}mobile-forms/`
      //       //   : "";
      //       const content = await FileSystem.readAsStringAsync(filePath);
      // console.log(content)
      //       // if (to) {
      //       //   // const uri = await moveTo(filePath, to);
      //       //   const canOpen = await Linking.canOpenURL(filePath);
      //       //   console.log({canOpen})
      //       //   if (canOpen) {
      // await Linking.openURL(filePath);
      //       //   }

      //         console.log("Ficheiro movido com sucesso.");
      // // }
    } catch (error) {
      console.error(error);
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
