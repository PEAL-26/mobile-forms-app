import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { dataCollection, form, formField, section } from "./schema";

export const formSchema = createInsertSchema(form);
export type FormSchemaType = z.infer<typeof formSchema>;

export const sectionSchema = createInsertSchema(section);
export type SectionSchemaType = z.infer<typeof sectionSchema>;

export const formFieldSchema = createInsertSchema(formField);
export type FormFieldSchemaType = z.infer<typeof formFieldSchema>;

export const dataCollectionSchema = createInsertSchema(dataCollection);
export type DataCollectionSchemaType = z.infer<typeof dataCollectionSchema>;
