import { db } from "@/db";

export type UpdateFormRequest = {
  name: string;
  description?: string;
};

export async function updateFormService(data: UpdateFormRequest, id: string) {
  await db.update(
    "forms",
    {
      name: data.name,
      description: data?.description ?? null,
      updated_at: Date.now(),
    },
    id
  );
}
