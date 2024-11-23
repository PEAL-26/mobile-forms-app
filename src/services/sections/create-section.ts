import { db } from "@/db";

export type CreateSectionRequest = {
  name: string;
  description?: string;
};

export type CreateSectionResponseData = {
  id: number;
  name: string;
  description: string | null;
};

export async function createSectionService(data: CreateSectionRequest) {
  return db.insert<CreateSectionResponseData>("sections", {
    name: data.name,
    description: data?.description ?? null,
    created_at: Date.now(),
    updated_at: Date.now(),
  });
}
