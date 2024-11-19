import { Text, View, ViewProps } from "react-native";

type Data = {};

interface Props extends ViewProps {
  step: number;
  onChange?(props: {data: Data, isError: boolean}): void;
}

export function RegisterStep8(props: Props) {
  const { ...rest } = props;

  return (
    <View {...rest}>
      <Text>{`Formulário 8`}</Text>
    </View>
  );
}
