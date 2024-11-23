import { db } from "@/db";

export type ListTablesParams = {
  query?: string;
  size?: number;
  page?: number;
};

export type ListTablesResponseData = {
  id: number;
  name: string;
};

export async function listTableService(params?: ListTablesParams) {
  const { page, size, query } = params || {};
  return db.listPaginate<ListTablesResponseData>("data_tables", {
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
