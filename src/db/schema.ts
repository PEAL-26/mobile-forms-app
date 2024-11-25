import { sql } from "drizzle-orm";
import * as t from "drizzle-orm/sqlite-core";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const form = sqliteTable("forms", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`current_timestamp`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`current_timestamp`
  ),
});

export enum FIELD_TYPE_ENUM {
  "number" = "number",
  "boolean" = "boolean",
  "radio" = "radio",
  "checkbox" = "checkbox",
  "select" = "select",
  "text" = "text",
  "text_long" = "text_long",
}

export enum DATA_TYPE_ENUM {
  "list" = "list",
  "data_table" = "data_table",
}

export type ExtraFieldTriggerType = "true" | "false" | "any";

export type ExtraFieldType = {
  type: FIELD_TYPE_ENUM;
  display: string;
  trigger: ExtraFieldTriggerType;
};

export type FieldType = keyof typeof FIELD_TYPE_ENUM;

export type FieldDataWhereType = {
  parent_field?: string | null;
  child_field?: string | null;
  parent_identifier?: string | null;
  value?: any | null;
};

export type FieldDataType = {
  type: DATA_TYPE_ENUM;
  src?: any;
};

export const FIELD_TYPE_MAP: Record<FieldType, string> = {
  number: "Número",
  text: "Texto Simples",
  text_long: "Texto Longo",
  boolean: "Sim/Não",
  radio: "Escolha Única",
  checkbox: "Múltiplas Escolhas",
  select: "Seleção",
};

export const section = sqliteTable("sections", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`current_timestamp`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`current_timestamp`
  ),
});

export const formField = sqliteTable("forms_fields", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  formId: integer("form_id", { mode: "number" }).references(() => form.id),
  required: integer("required", { mode: "boolean" }).default(false),
  sectionId: integer("section_id", { mode: "number" }).references(
    () => section.id
  ),
  display: text("display").notNull(),
  type: t.text("type").$type<FieldType>().default("text").notNull(),
  identifier: text("identifier").notNull(),

  data: text("data", { mode: "json" }),
  // {type: 'list'|'data_table', src: ''}

  dataWhere: text("data_where", { mode: "json" }),
  // {field:string, value:string, from_another_selection: string}
  // from_another_selection -> informar o identificador do campo
  // se for a partir de outra infromação selecionada a partir de outro select, o {field} deve ser o campo a ser levado em conta do outro select, e o from_another_selection deve ser informado o valor do identificador do outro select
  extraField: text("extra_field", { mode: "json" }),
  // {identifier:string, type:string, display: string}
  // field: nome do campo, type: tipo de dado

  description: text("description"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`current_timestamp`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`current_timestamp`
  ),
});

export const province = sqliteTable("provinces", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
});

export const city = sqliteTable("cities", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  provinceId: integer("province_id", { mode: "number" })
    .references(() => province.id)
    .notNull(),
  name: text("name").notNull(),
});

export type FormationLevelTypes = "secondary_education" | "higher_education";

export const formation = sqliteTable("formations", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  level: t.text().$type<FormationLevelTypes>().notNull(),
  name: text("name").notNull(),
});

export const dataCollection = sqliteTable("data_collection", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  identifier: text("identifier").notNull(),
  formFieldId: integer("form_field_id", { mode: "number" })
    .references(() => formField.id)
    .notNull(),
  field: text("field").notNull(),
  type: t.text().$type<FieldType>().default("text"),
  value: text("value").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`current_timestamp`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`current_timestamp`
  ),
});

export const dataTable = sqliteTable("data_tables", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`current_timestamp`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`current_timestamp`
  ),
});
