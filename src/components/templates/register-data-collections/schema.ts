import { DATA_TYPE_ENUM, FIELD_TYPE_ENUM } from "@/db";
import { z } from "zod";

export type DataUpdate = {
  value: any;
  extraFieldDisplay?: string;
  extraFieldValue?: any;
};

const fieldSchema = z.object({
  formFieldId: z.number(),
  section: z
    .object({
      id: z.number().nullable(),
      name: z.string().nullable(),
      description: z.string().nullable(),
    })
    .nullable()
    .optional(),
  required: z.boolean().default(false),
  display: z.string(),
  type: z.nativeEnum(FIELD_TYPE_ENUM),
  identifier: z.string(),
  data: z
    .object({
      type: z.nativeEnum(DATA_TYPE_ENUM),
      src: z.any(),
    })
    .nullable(),
  dataWhere: z
    .object({
      parent_field: z.string().optional(),
      child_field: z.string().optional(),
      parent_identifier: z.string().optional(),
      value: z.any().optional(),
    })
    .nullable(),
  extraField: z.object({}).nullable(),
  description: z.object({}).nullable(),
});

const collectionSchema = z.object({
  fields: fieldSchema,
  identifier: z.string().optional(),
  value: z.any(),
});

const dataCollectionFormSchema = z.object({
  id: z.number(),
  name: z.string(),
  descriptions: z.string().optional(),
});

export const dataCollectionSchema = z.object({
  form: dataCollectionFormSchema,
  collections: z.array(collectionSchema),
});

export type DataCollectionFormSchemaType = z.infer<
  typeof dataCollectionFormSchema
>;
export type DataCollectionSchemaType = z.infer<typeof dataCollectionSchema>;
export type DataCollectionFieldSchemaType = z.infer<typeof fieldSchema>;
