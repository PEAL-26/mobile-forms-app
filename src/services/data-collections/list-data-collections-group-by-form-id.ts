import { db } from "@/db";

export type ListDataCollectionsGroupByFormIdParams = {
  formId: number;
  size?: number;
  page?: number;
};

export type ListDataCollectionsGroupByFormIdResponseData = {
  id: number;
  identifier: string;
  updatedAt: number;
};

export async function listDataCollectionsGroupByFormId(
  params?: ListDataCollectionsGroupByFormIdParams
) {
  const { page, size, formId } = params || {};
  return db.listPaginate<ListDataCollectionsGroupByFormIdResponseData>(
    "data_collection",
    {
      select: {
        id: true,
        identifier: true,
        updated_at: {
          as: "updatedAt",
        },
      },
      include: {
        forms_fields: {
          singular: "form_field",
        },
      },
      page,
      size,
      where: {
        formId: {
          as: "forms_fields.form_id",
          value: formId,
        },
      },
      groupBy: ["data_collection.identifier"],
    }
  );
}
