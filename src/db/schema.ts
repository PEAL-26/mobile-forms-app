import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";

export const form = sqliteTable("forms", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
});

export type FieldType =
  | "number"
  | "boolean"
  | "radio"
  | "checkbox"
  | "select"
  | "text"
  | "text_long";

export const FIELD_TYPE_MAP: Record<FieldType, string> = {
  number: "Número",
  boolean: "Sim/não",
  radio: "Escolha Única",
  checkbox: "Múltiplas Escolhas",
  text: "Texto Simples",
  text_long: "Texto Longo",
  select: "Selecionar um item",
};

export const section = sqliteTable("sections", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
});

export const formField = sqliteTable("forms_fields", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  formId: integer("form_id", { mode: "number" }).references(() => form.id),
  sectionId: integer("section_id", { mode: "number" })
    .references(() => section.id)
    .notNull(),
  display: text("display").notNull(),
  type: t.text("type").$type<FieldType>().default("text").notNull(),
  identifier: text("identifier"),

  data: text("data"),
  // array: [Item1;; Item2] || table: TableName

  dataFields: text("data_fields"),
  // {identifier:string, title:string}

  dataWhere: text("data_where"),
  // {field:string, value:string, from_another_selection: string}
  // from_another_selection -> informar o identificador do campo
  // se for a partir de outra infromação selecionada a partir de outro select, o {field} deve ser o campo a ser levado em conta da outro select, e o from_another_selection deve ser informado o valor do identificador do outro select
  extraField: text("extra_field"),
  // {indentifier:string, type:string, display: string}
  // field: nome do campo, type: tipo de dado

  description: text("description"),
});

export const province = sqliteTable("provinces", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
});

export const city = sqliteTable("cities", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  provinceId: integer("section_id", { mode: "number" })
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

// export type NeedCategoryTypes = "A" | "B" | "C" | "D" | "e";

// export const need = sqliteTable("needs", {
//   id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
//   formId: integer("form_id", { mode: "number" })
//     .references(() => form.id)
//     .notNull(),
//   provinceId: integer("province_id", { mode: "number" })
//     .references(() => province.id)
//     .notNull(),
//   cityId: integer("city_id", { mode: "number" })
//     .references(() => city.id)
//     .notNull(),
//   category: t.text().$type<NeedCategoryTypes>().notNull(),
// });

export const dataCollection = sqliteTable("data_collection", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  formFieldId: integer("formField_id", { mode: "number" })
    .references(() => formField.id)
    .notNull(),
  sectionId: integer("section_id", { mode: "number" })
    .references(() => section.id)
    .notNull(),
  field: text("field").notNull(),
  type: t.text().$type<FieldType>().default("text"),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  extraFieldDisplay: text("extra_field_display"),
  extraFieldValue: text("extra_field_value")
});
