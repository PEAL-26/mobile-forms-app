import { Alert } from "react-native";

export async function alert(title: string, message?: string) {
  return new Promise<boolean>((resolver, reject) => {
    const onPressConfirm = () => {
      resolver(true);
    };

    const onPressCancel = () => {
      resolver(false);
    };

    Alert.alert(title, message, [
      { text: "Sim", onPress: onPressConfirm },
      { text: "Não", onPress: onPressCancel, style: "destructive" },
    ]);
  });
}
