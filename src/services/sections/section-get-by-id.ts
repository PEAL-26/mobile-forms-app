import { db } from "@/db";

export type SectionResponseData = {
  id: number;
  name: string;
  description: string | null;
  createdAd: Date;
  updatedAt: Date;
};

export async function sectionGetByIdService(id: number) {
  return db.getFirst<SectionResponseData>("sections", {
    select: {
      id: true,
      name: true,
      description: true,
      created_at: {
        as: "createdAd",
      },
      updated_at: {
        as: "updatedAt",
      },
    },
    where: {
      id,
    },
  });
}
