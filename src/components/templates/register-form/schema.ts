import { DATA_TYPE_ENUM, FIELD_TYPE_ENUM } from "@/db";
import { z } from "zod";

const sectionSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const fieldSchema = z.object({
  identifier: z.string(),
  require: z.boolean().default(false).optional(),
  section: sectionSchema.optional(),
  type: z.nativeEnum(FIELD_TYPE_ENUM).default(FIELD_TYPE_ENUM.text),
  display: z.string(),
  description: z.string().optional(),
  data: z
    .object({
      type: z.nativeEnum(DATA_TYPE_ENUM).default(DATA_TYPE_ENUM.array),
      src: z.string(),
    })
    .optional(),
  dataWhere: z
    .object({
      field: z.string(),
      value: z.string().optional(),
      fromAnotherSelection: z.string(),
    })
    .optional(),
  extraField: z
    .object({
      identifier: z.string(),
      type: z.nativeEnum(FIELD_TYPE_ENUM).default(FIELD_TYPE_ENUM.text),
      display: z.string(),
    })
    .optional(),
});

export const formSchema = z.object({
  name: z.string(),
  fields: z.array(fieldSchema),
});

export type FormSchemaType = z.infer<typeof formSchema>;
export type FormFieldSchemaType = z.infer<typeof fieldSchema>;
export type SectionSchemaType = z.infer<typeof sectionSchema>;
