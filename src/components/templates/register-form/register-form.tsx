import { useState } from "react";
import { PlusIcon } from "lucide-react-native";
import { View, ScrollView } from "react-native";

import { cn } from "@/lib/utils";
import { FIELD_TYPE_ENUM } from "@/db";
import { Text } from "@/components/ui/text";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FlashList } from "@/components/ui/flash-list";
import { SeparatorWithLabel } from "@/components/ui/separator";
import { SectionModal } from "@/components/modals/section-modal";
import { DataTypeModal } from "@/components/modals/data-type-modal";
import { PreviewFormModal } from "@/components/modals/preview-form-modal";
import { SelectDataTableModal } from "@/components/modals/select-data-table-modal";

import { RegisterFormProps } from "./types";
import { SectionSchemaType } from "./schema";
import { FieldComponent } from "./field-component";
import { useRegisterForm } from "./use-register-form";
import { Loading, LoadingPage } from "@/components/ui/loading";
import { ErrorPage } from "@/components/ui/page-errors";

export function RegisterForm(props: RegisterFormProps) {
  const { form: mainForm } = props;
  const {
    form,
    fields,
    handleSubmit,
    handleAddField,
    handleUpdateField,
    handleRemoveField,
    setFieldData,
    formFields,
    isSaving,
  } = useRegisterForm(props);

  const [openDataTypeModal, setOpenDataTypeModal] = useState(false);
  const [openSectionModal, setOpenSectionModal] = useState(false);
  const [openDataTableModal, setOpenDataTableModal] = useState(false);
  const [fieldSelect, setFieldSelect] = useState<string | undefined>();

  const handleSelectDataType = (type: FIELD_TYPE_ENUM) => {
    if (fieldSelect) {
      handleUpdateField(fieldSelect, { type });
    }
  };

  const handleUpdateSection = (section: SectionSchemaType) => {
    if (fieldSelect) {
      handleUpdateField(fieldSelect, { section });
    }
  };

  if (form && formFields?.isError) {
    return <ErrorPage refetch={formFields.refetch} />;
  }

  if (formFields?.isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <ScrollView>
        <View className="flex-1 p-3 w-full pb-16">
          <Label>Nome do formulário</Label>
          <Input
            placeholder="Nome do formulário"
            className="mb-2"
            defaultValue={mainForm?.name}
            onChangeText={(value) => form.setValue("name", value)}
          />
          {form.getFieldState("name").error?.message && (
            <Text className="text-xs text-red-500 p-0 mb-3">
              {form.getFieldState("name").error?.message}
            </Text>
          )}
          <Textarea
            placeholder="Descrição (opcional)"
            defaultValue={mainForm?.description ?? undefined}
            onChangeText={(value) => form.setValue("description", value)}
          />

          <SeparatorWithLabel label="Campos" />

          <FlashList
            data={fields}
            renderItem={({ item, index }) => (
              <FieldComponent
                field={item}
                number={index + 1}
                onRemoveField={() => handleRemoveField(item.identifier)}
                onOpenDataTypeModal={() => {
                  setFieldSelect(item.identifier);
                  setOpenDataTypeModal(true);
                }}
                onOpenSectionModal={() => {
                  setFieldSelect(item.identifier);
                  setOpenSectionModal(true);
                }}
                onUpdateData={(data) => {
                  setFieldData({ ...data, identifier: item.identifier });
                }}
                onOpenDataTableModal={() => {
                  setFieldSelect(item.identifier);
                  setOpenDataTableModal(true);
                }}
                onChangeRequiredField={(require) => {
                  handleUpdateField(item.identifier, { required: require });
                }}
                onChangeTitle={(display) => {
                  handleUpdateField(item.identifier, { display });
                }}
                onChangeDescription={(description) => {
                  handleUpdateField(item.identifier, { description });
                }}
              />
            )}
          />

          <Button
            icon={PlusIcon}
            className="flex-row items-center gap-3 justify-center p-2 bg-white rounded border border-gray-200"
            containerClassName="mt-5"
            onPress={handleAddField}
          >
            Adicionar Campo
          </Button>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 flex flex-row items-center justify-end p-3 ">
        <Button
          className={cn("rounded p-2  px-3 bg-blue-700")}
          textClassName="text-white"
          onPress={handleSubmit}
        >
          Guardar
        </Button>
      </View>
      <PreviewFormModal fields={{}} />
      {openDataTypeModal && (
        <DataTypeModal
          open={openDataTypeModal}
          onClose={setOpenDataTypeModal}
          onSelect={handleSelectDataType}
        />
      )}
      {openSectionModal && (
        <SectionModal
          open={openSectionModal}
          onClose={setOpenSectionModal}
          onSelect={handleUpdateSection}
        />
      )}
      {openDataTableModal && (
        <SelectDataTableModal
          open={openDataTableModal}
          onClose={setOpenDataTableModal}
          // onSelect={handleUpdateSection}
        />
      )}

      <Loading show={isSaving} />
    </>
  );
}
