import { DatabaseConfigSelect } from "./types";

export function generateQueryFields(select?: DatabaseConfigSelect) {
  if (!select) return "*";
  let selectFields: string[] = [];
  const fields = Object.entries(select);

  for (const [field, value] of fields) {
    if (typeof value === "boolean") {
      selectFields.push(field);
      continue;
    }
    if (typeof value === "object") {
      const { as } = value;
      selectFields.push(`${field} AS ${as}`);
      continue;
    }
  }
  return selectFields.join(",");
}

export function generateWhereClause(where?: Record<string, any>): string {
  if (!where) return "";

  const conditions = Object.entries(where).map(([key, condition]) => {
    if (typeof condition === "object" && condition.value) {
      const column = condition.as || key;
      const value = condition.value;

      // SQL para case insensitive e ignora acentos (exemplo PostgreSQL)
      return `LOWER(${column}) LIKE LOWER('%${value}%')`;
    }
    return "";
  });

  return conditions.length > 0
    ? `WHERE ${conditions.filter(Boolean).join(" AND ")}`
    : "";
}
