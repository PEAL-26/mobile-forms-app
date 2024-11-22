import { memo, useCallback } from "react";
import { View } from "react-native";
import debounce from "lodash.debounce";
import { Text } from "@/components/ui/text";
import { RenderComponent } from "@/components/ui/render-component";
import { FIELD_TYPE_ENUM } from "@/db";

type Default = {
  id: number;
  name: string;
  description: string | null;
};

type Fields = {
  identifier: string;
  section?: Default | null;
  display: string;
  type: FIELD_TYPE_ENUM;
  data?: string | null;
  dataFields?: string | null;
  dataWhere?: string | null;
  extraField?: string | null;
  description?: string | null;
};

interface FormRenderProps {
  fields: Fields;
  value?: any;
  onUpdate?(identifier: string, data: any): void;
  onOpenOutside?(): void;
}

var lastSection = "";
var showSection = false;
const FormRender = memo((props: FormRenderProps) => {
  const { fields, onUpdate, onOpenOutside } = props;
  if (fields?.section === null) {
    showSection = false;
  } else {
    if (lastSection !== fields?.section?.name) {
      lastSection = fields?.section?.name ?? "";
      showSection = true;
    } else {
      showSection = false;
    }
  }

  const debouncedOnUpdate = useCallback(
    (identifier: string, data: any) =>
      debounce(() => {
        onUpdate?.(identifier, data);
      }, 500),
    [onUpdate]
  );

  // TODO Fazer todo o processamento de dados aqui nessa parte

  return (
    <View className="px-3 mt-4">
      {showSection && (
        <View className="flex flex-row items-center gap-2 my-5">
          <View className="h-[1px] bg-gray-300 w-full flex-1" />
          <Text className="text-gray-600 max-w-[80%] text-center w-fit">
            {fields.section?.name ?? ""}
          </Text>
          <View className="h-[1px] bg-gray-300 w-full flex-1" />
        </View>
      )}
      <RenderComponent
        fields={fields}
        // defaultData={value}
        onChange={(value) => debouncedOnUpdate(fields.identifier, { value })}
        onChangeExtras={(extras) =>
          debouncedOnUpdate(fields.identifier, { value: extras })
        }
        onOpenOutside={onOpenOutside}
      />
    </View>
  );
});

FormRender.displayName = "FormRender";

export { FormRender };
