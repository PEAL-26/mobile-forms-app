import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import debounce from "lodash.debounce";
import { Text } from "@/components/ui/text";
import { RenderComponent } from "@/components/ui/render-component";
import { FIELD_TYPE_ENUM } from "@/db";
import { generateData } from "@/services/data";
import { Label } from "@/components/ui/label";

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
  data?: any | null;
  dataWhere?: any | null;
  extraField?: any | null;
  description?: string | null;
};

interface FormRenderProps {
  fields: Fields;
  value?: any;
  onUpdate?(identifier: string, data: any): void;
  onOpenOutside?(): void;
  onClearSelect?(index: number): void;
  collections?: any;
}

var lastSection = "";
var showSection = false;

export const FormRender = memo((props: FormRenderProps) => {
  const { fields, value, onUpdate, onClearSelect, collections } = props;

  if (!fields?.section?.name) {
    showSection = false;
  } else {
    if (lastSection !== fields?.section?.name) {
      lastSection = fields?.section?.name ?? "";
      showSection = true;
    } else {
      showSection = false;
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnUpdate = useCallback(
    debounce((identifier: string, data: any) => {
      onUpdate?.(identifier, data);
    }, 300),
    [onUpdate]
  );

  const [data, setData] = useState<{ value: string; label: string }[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const loadingData = useCallback(() => {
    if (
      fields?.type === FIELD_TYPE_ENUM.checkbox ||
      fields?.type === FIELD_TYPE_ENUM.radio
    ) {
      setIsLoadingData(true);
      generateData(fields.data, {
        dataWhere: fields.dataWhere,
      })
        .then((response) =>
          setData(
            response.map(({ id, title }) => ({
              value: String(id),
              label: title,
            }))
          )
        )
        .finally(() => {
          setIsLoadingData(false);
        });
    }
  }, [fields.data, fields.dataWhere, fields?.type]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  const defaultValue = useMemo(() => value, [value]);
  const extras = useMemo(() => {
    if (fields?.extraField) {
      return JSON.parse(JSON.stringify(fields?.extraField));
    }

    return undefined;
  }, [fields?.extraField]);

  const dataWhere = useMemo(() => {
    if (fields?.dataWhere) {
      return JSON.parse(JSON.stringify(fields?.dataWhere));
    }

    return undefined;
  }, [fields?.dataWhere]);

  const selectData = useMemo(() => {
    if (fields?.data && fields.type === FIELD_TYPE_ENUM.select) {
      return JSON.parse(JSON.stringify(fields.data));
    }

    return undefined;
  }, [fields.data, fields.type]);

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
      <View className="flex-col gap-2">
        <Label className="text-base">{fields.display}</Label>
        <RenderComponent
          data={data}
          isLoading={isLoadingData}
          type={fields.type}
          extras={extras}
          identifier={fields.identifier}
          defaultValue={defaultValue}
          onChange={(value) => {
            debouncedOnUpdate(fields.identifier, value);
          }}
          onChangeExtraField={(extra) =>
            debouncedOnUpdate(fields.identifier, extra)
          }
          selectData={selectData}
          dataWhere={dataWhere}
          onClearSelect={onClearSelect}
          collections={collections}
          // onOpenOutside={onOpenOutside}
        />
      </View>
    </View>
  );
});

FormRender.displayName = "FormRender";
