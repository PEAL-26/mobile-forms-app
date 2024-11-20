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
      const queryFields = generateQueryFields(select)
        .map((field) => `${as}.${field}`)
        .join(", ");
      const tableName = `${key} AS ${as}`;

      const join = `INNER JOIN ${tableName} ON ${as}.id = ${tableMain}.${as}_id`;

      fields.push(queryFields);
      joins.push(join);

      if (include) {
        generateIncludes(key, include, true);
      }
    }
  }

  return { fields: fields.join(", "), joins: joins.join("\n") };
}
