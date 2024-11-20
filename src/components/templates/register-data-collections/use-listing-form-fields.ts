import { db, FIELD_TYPE_ENUM } from "@/db";
import { useQueryPagination } from "@/hooks/use-query-pagination";

export type FormFieldListResponseData = {
  id: number;
  section: {
    id: number;
    name: string;
    description: string | null;
  } | null;
  display: string;
  type: FIELD_TYPE_ENUM;
  identifier: string;
  data: string | null;
  dataFields: string | null;
  dataWhere: string | null;
  extraField: string | null;
  description: string | null;
};

interface Props {
  formId?: number;
}

export function useFormFieldsListing(props: Props) {
  const { formId } = props;
  return useQueryPagination<FormFieldListResponseData>({
    fn: ({ page }) =>
      db.listPaginate("forms_fields", {
        select: {
          id: true,
          display: true,
          type: true,
          identifier: true,
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
        where: {
          formId: {
            as: "form_id",
            value: formId,
          },
        },
      }),
    queryKey: ["forms_fields"],
  });
}
