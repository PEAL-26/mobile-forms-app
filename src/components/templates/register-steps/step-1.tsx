import { useEffect } from "react";
import { Text, View, ViewProps } from "react-native";

type Data = {};

interface Props extends ViewProps {
  step: number;
  onChange?(props: { data: Data; isError: boolean }): void;
}

export function RegisterStep1(props: Props) {
  const { step, onChange, ...rest } = props;
  
  useEffect(() => {
    // if (step !== 1) {
    //   onChange?.({isError: false})
    // }
  }, [step]);

  return (
    <View {...rest}>
      <Text>{`Formulário 1`}</Text>
    </View>
  );
}
