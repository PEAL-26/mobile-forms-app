import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export function FieldComponentCondicional() {
  return (
    <>
      <Button
        className="bg-white rounded-md py-2"
        textClassName="text-center"
      >
        Campo Condicional
      </Button>
      <Text className="text-sm">
        {/* Descrição do campo condicional: ex.: este campo será exibido quando o
    valor selecionado for x */}
      </Text>
    </>
  );
}
