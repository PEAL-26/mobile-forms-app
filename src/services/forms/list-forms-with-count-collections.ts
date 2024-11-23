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
      description: true,
    },
    page,
    size,
    where: {
      name: query,
    },
    orderBy: [{ created_at: "desc" }],
  });
}
