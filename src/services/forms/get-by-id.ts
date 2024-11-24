import { db } from "@/db";

export type FormGetByIdResponseData = {
  id: number;
  name: string;
  description: string | null;
  collections: number;
};

export async function getFormByIdService(id: number) {
  let form = await db.getFirst<FormGetByIdResponseData>("forms", {
    select: {
      id: true,
      name: true,
      description: true,
    },
    where: {
      id,
    },
  });

  if (!form) return null;
  const [dataCollection] = await db.query<{ count: number }>(`
    SELECT COUNT(DISTINCT (dc.identifier)) as count
    FROM data_collection dc
    INNER JOIN forms_fields ff ON ff.id = dc.form_field_id
    WHERE ff.form_id = ${id}`);

  form.collections = dataCollection.count;

  return form;
}
