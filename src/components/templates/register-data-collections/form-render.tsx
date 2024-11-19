import { Fragment, memo, useCallback } from "react";
import { View } from "react-native";
import debounce from "lodash.debounce";
import { Text } from "@/components/ui/text";
import { RenderComponent } from "@/components/ui/render-component";

var lastSection = "";
var showSection = false;

type Default = {
  id: number;
  name: string;
  description?: string;
};

type Fields = {
  identifier: string;
  section?: Default;
  display: string;
  type: string;
  data?: string;
  dataFields?: string;
  dataWhere?: string;
  extraField?: string;
  description?: string;
};

type Item = {
  fields: Fields;
};

interface FormRenderProps {
  item: Item;
  onUpdate?(identifier: string, data: any): void;
}

const FormRender = memo((props: FormRenderProps) => {
  const { item, onUpdate } = props;
  if (lastSection !== item.fields?.section?.name) {
    lastSection = item.fields?.section?.name ?? "";
    showSection = true;
  } else {
    showSection = false;
  }

  const debouncedOnUpdate = useCallback(
    debounce((identifier: string, data: any) => {
      onUpdate?.(identifier, data);
    }, 300),
    [onUpdate]
  );

  return (
    <Fragment>
      {showSection && (
        <View className="flex flex-row items-center gap-2 my-5">
          <View className="h-[1px] bg-gray-300 w-full flex-1" />
          <Text className="text-gray-600 max-w-[80%] text-center w-fit">
            {item.fields.section?.name ?? ""}
          </Text>
          <View className="h-[1px] bg-gray-300 w-full flex-1" />
        </View>
      )}
      <RenderComponent
        key={item.fields.identifier}
        fields={item.fields}
        // defaultData={item.value}
        onChange={(value) =>
          debouncedOnUpdate(item.fields.identifier, { value })
        }
        onChangeExtras={(extras) =>
          debouncedOnUpdate(item.fields.identifier, { value: extras })
        }
      />
    </Fragment>
  );
});

FormRender.displayName = "FormRender";

export { FormRender };
