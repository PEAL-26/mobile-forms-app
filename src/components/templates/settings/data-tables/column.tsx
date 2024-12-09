import { Text, View } from "react-native";
import { memo, useMemo, useRef, useState } from "react";
import { EllipsisIcon, TrashIcon } from "lucide-react-native";

import {
  DATABASE_COLUMNS_TYPE_ENUM,
  DATABASE_COLUMNS_TYPE_ENUM_MAP,
} from "@/db/database";
import { cn } from "@/lib/utils";
import { createSlug } from "@/helpers/slug";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectData } from "@/components/ui/select-data";
import { Checkbox, CheckboxWithLabel } from "@/components/ui/checkbox";
import { ForeignKeyModal, FK } from "@/components/modals/foreign-key-modal";

export type ColumnType = {
  name: string;
  title: string;
  pk?: boolean;
  fk?: FK;
  searchable?: boolean;
  visible?: boolean;
  dataType: DATABASE_COLUMNS_TYPE_ENUM;
};

interface Props {
  defaultData?: ColumnType;
  onChange?(column: ColumnType): void;
  onRemove?(): void;
}

export const Column = memo((props: Props) => {
  const { defaultData, onChange, onRemove } = props;
  const dataDefault = useMemo(() => defaultData, [defaultData]);

  const [fieldName, setFieldName] = useState("");
  const [fieldTitle, setFieldTitle] = useState("");
  const [relationship, setRelationship] = useState(false);
  const [searchable, setSearchable] = useState(false);
  const [primaryKey, setPrimaryKey] = useState(false);
  const [foreignKey, setForeignKey] = useState<FK | undefined>(undefined);
  const [visible, setVisible] = useState<boolean>(true);
  const [dataType, setDataType] = useState<DATABASE_COLUMNS_TYPE_ENUM>(
    DATABASE_COLUMNS_TYPE_ENUM.TEXT
  );
  const [openForeignKeyModal, setOpenForeignKeyModal] = useState(false);

  const handleChangeFieldName = (text: string) => {
    const name = createSlug(text).replaceAll("-", "_");
    handleChange({ name, title: text });
  };

  const handleChangeForeignKey = (fk: FK) => {
    const name = `${fk.table}_${fk.reference.name}`;
    const title = `${fk.field}`;
    handleChange({ name, title, dataType: fk.display.dataType, fk });
  };

  const dataRef = useRef<ColumnType>();

  const handleChange = (data: Partial<ColumnType>) => {
    const oldData = {
      name: fieldName,
      title: fieldTitle,
      pk: primaryKey,
      fk: foreignKey,
      searchable,
      visible,
      dataType,
    };

    const set: Record<keyof ColumnType, any> = {
      name: setFieldName,
      title: setFieldTitle,
      pk: setPrimaryKey,
      fk: setForeignKey,
      searchable: setSearchable,
      visible: setVisible,
      dataType: setDataType,
    };

    const newData: ColumnType = { ...oldData, ...data };
    onChange?.(newData);

    Object.entries(newData).forEach(([property, value]) => {
      if (
        dataRef.current?.[property as keyof ColumnType] !==
        newData[property as keyof ColumnType]
      ) {
        set[property as keyof ColumnType](value);
      }
    });

    dataRef.current = newData;
  };

  const DATA_TYPES = Object.entries(DATABASE_COLUMNS_TYPE_ENUM_MAP).map(
    ([id, name]) => ({ id: id as DATABASE_COLUMNS_TYPE_ENUM, name })
  );

  return (
    <>
      <View className="flex flex-col gap-3 bg-white p-3 rounded-md">
        {/* PrimaryKey */}
        <View className="flex flex-row items-center justify-between">
          <Text className="text-xs">Chave Primária (PK)</Text>
          <Checkbox
            checked={primaryKey}
            onCheckedChange={(pk) => handleChange({ pk })}
          />
        </View>

        {/* FieldTitle */}
        <View>
          <Input
            readOnly={relationship}
            placeholder="Nome"
            value={fieldTitle}
            onChangeText={handleChangeFieldName}
            className={cn(relationship && "bg-gray-200")}
          />
          {fieldName && <Text className="text-xs">{fieldName}</Text>}
        </View>

        {/* DATA_TYPE */}
        <View>
          <SelectData
            disabled={relationship}
            className={cn(relationship && "bg-gray-200")}
            data={DATA_TYPES}
            defaultValue={DATA_TYPES.find((d) => d.id === dataType)}
            placeholder="Tipo de Dados"
            onSelect={(item) => {
              handleChange({ dataType: item.id });
            }}
            //   onChangeText={handleChangeFieldName}
            //   className={cn(relationship && "bg-gray-200")}
          />
        </View>

        {/* Relationship */}
        <View className="flex flex-row items-center justify-between">
          <CheckboxWithLabel
            label="Relacionar com outra tabela"
            labelClassName="text-xs"
            onChecked={(checked) => setRelationship(checked)}
          />
          <Button
            disabled={!relationship}
            icon={EllipsisIcon}
            className={cn(
              "bg-white rounded p-1 border border-gray-200",
              !relationship && "bg-gray-200"
            )}
            iconSize={20}
            onPress={() => setOpenForeignKeyModal(true)}
          />
        </View>

        {/* Searchable */}
        <View className="flex flex-row items-center justify-between">
          <Text className="text-xs">Coluna pesquisável</Text>
          <Checkbox
            checked={searchable}
            onCheckedChange={(searchable) => handleChange({ searchable })}
          />
        </View>

        {/* Visible */}
        <View className="flex flex-row items-center justify-between">
          <Text className="text-xs">Coluna visível na listagem</Text>
          <Checkbox
            checked={visible}
            onCheckedChange={(visible) => handleChange({ visible })}
          />
        </View>

        {/* ButtonDelete */}
        <View className="flex flex-row items-center justify-center">
          <Button
            iconSize={16}
            icon={TrashIcon}
            iconColor="#ef4444"
            onPress={onRemove}
          />
        </View>
      </View>

      <ForeignKeyModal
        defaultData={foreignKey}
        open={openForeignKeyModal}
        onClose={setOpenForeignKeyModal}
        onApply={handleChangeForeignKey}
      />
    </>
  );
});

Column.displayName = "Column";
