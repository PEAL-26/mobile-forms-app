import { db, FIELD_TYPE_ENUM } from "@/db";

export type UpdateFormFieldsBulkRequest = {
  id: number;
  formId: number;
  required: boolean;
  sectionId?: number;
  display: string;
  type: FIELD_TYPE_ENUM;
  identifier: string;
  data?: object;
  dataWhere?: object;
  extraField?: object;
};

export async function updateFormFieldsBulkService(
  data: UpdateFormFieldsBulkRequest[]
) {
  await db.insertBulk(
    "forms_fields",
    data.map((field) => ({
      id: field.id,
      form_id: field.formId,
      required: field.required,
      section_id: field.sectionId,
      display: field.display,
      type: field.type,
      identifier: field.identifier,
      data: field.data,
      data_where: field.dataWhere,
      extra_field: field.extraField,
      updated_at: Date.now(),
    }))
  );
}
