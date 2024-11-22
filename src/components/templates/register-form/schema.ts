import { FIELD_TYPE_ENUM } from "@/db";
import { z } from "zod";

const fieldSchema = z.object({
  identifier: z.string(),
  type: z.nativeEnum(FIELD_TYPE_ENUM).default(FIELD_TYPE_ENUM.text),
});

export const formSchema = z.object({
  name: z.string(),
  fields: z.array(fieldSchema),
});

export type FormSchemaType = z.infer<typeof formSchema>;
export type FormFieldSchemaType = z.infer<typeof fieldSchema>;
