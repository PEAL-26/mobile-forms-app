import { db } from "@/db";

export type FormGetByIdResponseData = {
  id: number;
  name: string;
  description: string | null;
};

export async function formGetByIdService(id: number) {
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
