import { db } from "@/db";

export type ListFormsParams = {
  query?: string;
  size?: number;
  page?: number;
};

export type ListFormsResponseData = {
  id: number;
  name: string;
};

export async function listForms(params?: ListFormsParams) {
  const { page, size, query } = params || {};
  return db.listPaginate<ListFormsResponseData>("forms", {
    select: {
      id: true,
      name: true,
    },
    page,
    size,
    where: {
      name: query,
    },
  });
}
