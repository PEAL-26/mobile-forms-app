import { db, FIELD_TYPE_ENUM } from "@/db";

export type CreateDataCollectionsRequest = {
  identifier: string;
  formFieldId: number;
  field: string;
  type: FIELD_TYPE_ENUM;
  value: any;
};

export async function createDataCollectionsService(
  data: CreateDataCollectionsRequest[]
) {
  await db.insertBulk(
    "data_collection",
    data.map((dataCollection) => ({
      identifier: dataCollection.identifier,
      form_field_id: dataCollection.formFieldId,
      field: dataCollection.field,
      type: dataCollection.type,
      value: dataCollection.value,
      created_at: Date.now(),
      updated_at: Date.now(),
    }))
  );
}
