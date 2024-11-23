import { db } from "@/db";

export type UpdateSectionRequest = {
  name: string;
  description?: string;
};

export async function updateSectionService(data: UpdateSectionRequest) {
  await db.insert("sections", {
    name: data.name,
    description: data?.description ?? null,
    updated_at: Date.now(),
  });
}
