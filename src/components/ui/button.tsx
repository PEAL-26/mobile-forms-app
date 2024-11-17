import { Pressable, PressableProps, Text, View } from "react-native";

export function Button(props: PressableProps) {
  const { children, ...rest } = props;
  return (
    <Pressable {...rest}>
      <View>
        <Text>{String(children)}</Text>
      </View>
    </Pressable>
  );
}
