import { db } from "@/db";

export type ListFormsParams = {
  query?: string;
  size?: number;
  page?: number;
};

export type ListFormsResponseData = {
  id: number;
  name: string;
  description?: string | null;
  collections: number;
};

export async function listFormsWithCountCollections(params?: ListFormsParams) {
  const { page, size, query } = params || {};
  return db.listPaginate<ListFormsResponseData>("forms", {
    select: {
      id: true,
      name: true,
    },
    fn: {
      forms_collections: "COUNT(DISTINCT(dc.identifier))",
    },
    page,
    size,
    where: {
      name: {
        op: "like",
        as: "forms.name",
        value: query,
      },
    },
    orderBy: [
      {
        "dc.updated_at": "desc",
      },
    ],
    groupBy: ["forms.id"],
    include: {
      forms_fields: {
        as: "ff",
        singular: "form_field",
        type: "LEFT",
        references: {
          left: "ff.form_id",
          right: "forms.id",
        },
        include: {
          data_collection: {
            as: "dc",
            singular: "data_collection",
            type: "LEFT",
            references: {
              left: "dc.form_field_id",
              right: "ff.id",
            },
          },
        },
      },
    },
  });
}
