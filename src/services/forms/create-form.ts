import { db, expoOpenDatabase, FIELD_TYPE_ENUM } from "@/db";

type CreateFormFieldsBulkRequest = {
  required: boolean;
  sectionId?: number;
  display: string;
  type: FIELD_TYPE_ENUM;
  identifier: string;
  data?: object;
  dataWhere?: object;
  extraField?: object;
  description?: string;
};

export type CreateFormRequest = {
  name: string;
  description?: string | null;
  fields?: CreateFormFieldsBulkRequest[];
};

export async function createFormService(data: CreateFormRequest) {
  await expoOpenDatabase.withTransactionAsync(async () => {
    const form = await db.insert<any>("forms", {
      name: data.name,
      description: data?.description ?? null,
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    const fields =
      data?.fields?.map((field) => ({
        form_id: form.id,
        required: field.required,
        section_id: field.sectionId || null,
        display: field.display,
        type: field.type,
        identifier: field.identifier,
        data: field.data || null,
        data_where: field.dataWhere || null,
        extra_field: field.extraField || null,
        created_at: Date.now(),
        updated_at: Date.now(),
      })) || [];

    await db.insertBulk("forms_fields", fields);
  });
}
