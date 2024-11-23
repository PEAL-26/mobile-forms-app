import { db, FIELD_TYPE_ENUM } from "@/db";

export type CreateFormFieldsBulkRequest = {
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

export async function createFormFieldsBulkService(
  data: CreateFormFieldsBulkRequest[]
) {
  await db.insertBulk(
    "forms_fields",
    data.map((field) => ({
      form_id: field.formId,
      required: field.required,
      section_id: field.sectionId ?? null,
      display: field.display,
      type: field.type,
      identifier: field.identifier,
      data: field.data ?? null,
      data_where: field.dataWhere ?? null,
      extra_field: field.extraField ?? null,
      created_at: Date.now(),
      updated_at: Date.now(),
    }))
  );
}
