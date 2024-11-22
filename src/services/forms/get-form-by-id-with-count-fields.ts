import { db } from "@/db";

export type GetFormByIdWithCountFieldsResponseData = {
  id: number;
  name: string;
  description: string | null;
  totalFields: number;
};

export async function getFormByIdWithCountFieldsService(id: number) {
  const [data, [{ totalFields }]] = await Promise.all([
    db.query(`SELECT id, name, description FROM forms WHERE id=${id}`),
    db.query<{ totalFields: number }>(
      `SELECT count(*) as totalFields FROM forms_fields WHERE form_id=${id}`
    ),
  ]);

  if (data.length === 0) return null;
  let form = data[0] as GetFormByIdWithCountFieldsResponseData;
  form.totalFields = totalFields;

  return form;
}
