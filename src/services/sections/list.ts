import { db } from "@/db";

export type ListSectionsParams = {
  query?: string;
  size?: number;
  page?: number;
};

export type ListSectionsResponseData = {
  id: number;
  name: string;
};

export async function listSectionService(params?: ListSectionsParams) {
  const { page, size, query } = params || {};
  return db.listPaginate<ListSectionsResponseData>("sections", {
    select: {
      id: true,
      name: true,
    },
    page,
    size,
    where: {
      name: query,
    },
    orderBy: [{ created_at: "desc" }],
  });
}
