import { db, FIELD_TYPE_ENUM } from "@/db";

export type ListFormsFieldsParams = {
  formId?: number;
  sectionId?: number;
  size?: number;
  page?: number;
};

export type ListFormsFieldsResponseData = {
  id: number;
  section: {
    id: number;
    name: string;
    description: string | null;
  } | null;
  display: string;
  required: boolean;
  type: FIELD_TYPE_ENUM;
  identifier: string;
  data: string | null;
  dataFields: string | null;
  dataWhere: string | null;
  extraField: string | null;
  description: string | null;
};

export async function listFormsFields(params?: ListFormsFieldsParams) {
  const { page, size, formId, sectionId } = params || {};
  return db.listPaginate<ListFormsFieldsResponseData>("forms_fields", {
    select: {
      id: true,
      display: true,
      type: true,
      identifier: true,
      required: true,
      data: true,
      data_fields: {
        as: "dataFields",
      },
      data_where: {
        as: "dataWhere",
      },
      extra_field: {
        as: "extraField",
      },
      description: true,
    },
    include: {
      sections: {
        as: "section",
        select: {
          id: true,
          name: true,
          description: true,
        },
      },
    },
    page,
    size,
    where: {
      formId: {
        as: "forms_fields.form_id",
        value: formId,
      },
      sectionId: {
        as: "forms_fields.section_id",
        value: sectionId,
      },
    },
  });
}
