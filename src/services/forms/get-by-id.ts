import { db } from "@/db";

export type FormGetByIdResponseData = {
  id: number;
  name: string;
  description: string | null;
  collections: number;
};

export async function getFormByIdService(id: number) {
  return db.getFirst<FormGetByIdResponseData>("forms", {
    select: {
      id: true,
      name: true,
      description: true,
    },
    where: {
      id,
    },
  });
}
