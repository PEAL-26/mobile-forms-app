import { formFieldSchema } from "@/db";
import { z } from "zod";

const fieldSchema = z.object({
  identifier: z.string(),
});

export const formSchema = z.object({
  name: z.string(),
  fields: z.array(fieldSchema),
});

export type FormSchemaType = z.infer<typeof formSchema>;
