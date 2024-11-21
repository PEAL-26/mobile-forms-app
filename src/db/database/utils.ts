import { exists } from "drizzle-orm";
import {
  DatabaseConfigSelect,
  DatabaseInclude,
  DatabaseWhere,
  DatabaseWhereField,
} from "./types";

export function generateQueryFields(select?: DatabaseConfigSelect) {
  if (!select) return ["*"];
  let selectFields: string[] = [];
  const fields = Object.entries(select);

  for (const [field, value] of fields) {
    if (typeof value === "boolean") {
      selectFields.push(field);
      continue;
    }
    if (typeof value === "object") {
      const { as } = value;
      selectFields.push(`${field}${as ? ` AS ${as}` : ""}`);
      continue;
    }
  }

  return selectFields;
}

export function generateWhereClause(where?: DatabaseWhere): string {
  if (!where) return "";

  const conditions = Object.entries(where).map(([key, condition]) => {
    let column = key;
    let value: DatabaseWhereField = condition;
    if (typeof condition === "object") {
      column = condition.as || key;
      value = condition.value !== undefined ? condition.value : undefined;
    }

    if (value !== undefined) {
      return `LOWER(${column}) LIKE LOWER('%${value}%')`;
    }

    return "";
  });

  return conditions.length > 0
    ? `WHERE ${conditions.filter(Boolean).join(" AND ")}`
    : "";
}

let joins: string[] = [];
let fields: string[] = [];
let tables: string[] = [];

export function generateIncludes(
  tableMain: string,
  include?: DatabaseInclude,
  recursive = false
) {
  if (!recursive) {
    joins = [];
    fields = [];
  }

  if (include) {
    const includes = Object.entries(include);
    for (const [key, values] of includes) {
      const { as, include, select } = values;
      const queryFields = generateQueryFields(select).map(
        (field) => `${as}.${field}`
      );

      const tableName = `${key} AS ${as}`;

      const join = `INNER JOIN ${tableName} ON ${as}.id = ${tableMain}.${as}_id`;

      tables.push(as);
      fields.push(...queryFields);
      joins.push(join);

      if (include) {
        generateIncludes(key, include, true);
      }
    }
  }

  return { fields, joins: joins.join("\n"), tables };
}

export function serialize(data: any, tableNames: string[]) {
  const mainTable = tableNames[0];
  let newData = [];
  for (const item of data) {
    let obj: Record<string, any> = {};

    for (const [field, value] of Object.entries(item)) {
      if (field.startsWith(mainTable)) {
        const fieldReplaced = field.replaceAll(`${mainTable}_`, "");
        obj[fieldReplaced] = value;
      } else {
        for (const table of tableNames.slice(1)) {
          if (field.startsWith(table)) {
            const fieldReplaced = field.replaceAll(`${table}_`, "");
            if (field === `${table}_${fieldReplaced}`) {
              setNestedValue(obj, `${table}.${fieldReplaced}`, value);
              break;
            }
          }
        }
      }
    }

    newData.push(obj);
  }

  return newData;
}

export function fieldsMap(fields: string[], tables: string[]) {
  const newFields = [];
  for (const field of fields) {
    if (field === "*" && tables.length === 1) {
      newFields.push(`${tables[0]}.*`);
      break;
    }
    const fieldSplitted = field.split(" AS ");
    const main = fieldSplitted[0]?.trim();
    const fieldAs = fieldSplitted[1]?.trim();
    const [table, _field] = (fieldAs || main).split(".");
    const tableFound = tables.find((t) => t === table);

    if (tableFound) {
      if (_field === "*") {
        newFields.push(`${table}.*`);
      } else {
        const newField = `${table}_${_field}`;
        newFields.push(`${main} AS ${newField}`);
      }
    }
    {
      if (!_field && table && tables.length === 1) {
        const newField = `${tables[0]}_${table}`;
        newFields.push(`${tables[0]}.${main} AS ${newField}`);
      }
    }
  }

  return newFields.join(", ");
}

function setNestedValue(
  obj: Record<string, any>,
  path: string,
  value: any
): void {
  const keys = path.split(".");
  let current = obj;

  keys.forEach((key, index) => {
    if (!current[key]) {
      current[key] = {};
    }

    if (index === keys.length - 1) {
      current[key] = value;
    }

    current = current[key];
  });
}
