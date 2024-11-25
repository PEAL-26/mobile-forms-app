import {
  SelectDataModal,
  SelectedData,
  SelectInfoType,
} from "@/components/modals/select-data-modal";
import { memo, useRef, useState } from "react";
import { Select } from "../../select";
import { FieldDataType, FieldDataWhereType } from "@/db";

interface Props {
  identifier: string;
  data?: FieldDataType | null;
  dataWhere?: FieldDataWhereType | null;
  defaultValue?: any;
  onChange?(value: any): void;
  onClearSelect?(index: number): void;
  collections: any[];
}

export const SelectData = memo((props: Props) => {
  const {
    identifier,
    data,
    dataWhere,
    defaultValue,
    onChange,
    onClearSelect,
    collections,
  } = props;

  const itemRef = useRef<string | undefined>();
  const [openSelectModal, setOpenSelectModal] = useState(false);
  const [selectInfo, setSelectInfo] = useState<SelectInfoType | undefined>(
    undefined
  );

  const handleOpenSelectModal = () => {
    setOpenSelectModal(true);

    if (dataWhere) {
      const parentField = collections.find(
        (c) => c.fields.identifier === dataWhere.parent_identifier
      );

      if (parentField) {
        dataWhere.value = parentField.value[dataWhere?.parent_field || ""];
      }
    }

    const child = collections.find((col) => {
      if (col.fields.dataWhere) {
        return col.fields?.dataWhere?.parent_identifier === identifier;
      }
      return false;
    });

    setSelectInfo({
      identifierField: identifier,
      data: data,
      dataWhere,
      child_field: {
        identifier: child?.fields?.identifier,
        clear: false,
      },
    });
  };

  const handleSelect = ({ item, child_field }: SelectedData) => {
    if (itemRef.current === item.id) return;

    if (child_field?.clear) {
      const fieldIndex = collections.findIndex(
        (c) => c.fields.identifier === child_field.identifier
      );

      onClearSelect?.(fieldIndex);
    }

    itemRef.current = item.id;
    onChange?.(item);
  };

  return (
    <>
      <Select
        defaultItem={defaultValue}
        onSelect={onChange}
        openOutside
        onOpenOutside={handleOpenSelectModal}
      />

      {openSelectModal && (
        <SelectDataModal
          info={selectInfo}
          open={openSelectModal}
          onClose={setOpenSelectModal}
          onSelect={handleSelect}
        />
      )}
    </>
  );
});

SelectData.displayName = "SelectData";
