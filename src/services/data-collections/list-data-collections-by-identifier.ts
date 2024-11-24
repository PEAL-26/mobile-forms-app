import { db, FIELD_TYPE_ENUM } from "@/db";

export type ListDataCollectionsByIdentifierParams = {
  identifier: string;
  size?: number;
  page?: number;
};

export type ListDataCollectionsByIdentifierResponseData = {
  id: number;
  field: {
    id: number;
    display: string;
    description: string | null;
    section: {
      id: number;
      name: string;
      description: string | null;
    };
  };
  value: any;
  type: FIELD_TYPE_ENUM;
};

export async function listDataCollectionsByIdentifier(
  params?: ListDataCollectionsByIdentifierParams
) {
  const { page, size, identifier } = params || {};
  return db.listPaginate<ListDataCollectionsByIdentifierResponseData>(
    "data_collection",
    {
      select: {
        id: true,
        type: true,
        value: true,
      },
      include: {
        forms_fields: {
          singular: "form_field",
          as: "field",
          select: {
            id: true,
            display: true,
            description: true,
          },
          include: {
            sections: {
              singular: "section",
              as: "section",
              type: "LEFT",
              select: {
                id: true,
                name: true,
                description: true,
              },
              references: {
                left: "section.id",
                right: "field.section_id",
              },
            },
          },
        },
      },
      page,
      size,
      where: {
        identifier: {
          as: "data_collection.identifier",
          value: identifier,
        },
      },
    }
  );
}
