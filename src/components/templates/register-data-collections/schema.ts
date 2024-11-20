import { FIELD_TYPE_ENUM } from "@/db";
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
      id: z.number(),
      name: z.string(),
      description: z.string().optional(),
    })
    .optional(),
  display: z.string(),
  type: z.nativeEnum(FIELD_TYPE_ENUM),
  identifier: z.string(),
  data: z.string().optional(),
  dataFields: z.string().optional(),
  dataWhere: z.string().optional(),
  extraField: z.string().optional(),
  description: z.string().optional(),
});

const collectionSchema = z.object({
  fields: fieldSchema,
  value: z.any(),
  extraFieldDisplay: z.string().optional(),
  extraFieldValue: z.any().optional(),
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
