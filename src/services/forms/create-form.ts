import { db } from "@/db";

export type CreateFormRequest = {
  name: string;
  description?: string;
};

export async function createFormService(data: CreateFormRequest) {
  await db.insert("forms", {
    name: data.name,
    description: data?.description ?? null,
    created_at: Date.now(),
    updated_at: Date.now(),
  });
}
