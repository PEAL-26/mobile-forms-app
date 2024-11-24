export type Field<T> = Record<keyof T, SelectField>;
export type SelectField = boolean | { as?: string; to_replace?: boolean };
export type DatabaseConfigSelect = {
  [key: string]: SelectField;
};

export type DatabaseWhereFieldValue = string | number | boolean | undefined;
export type DatabaseWhereField =
  | DatabaseWhereFieldValue
  | {
      value: DatabaseWhereFieldValue;
      as?: string;
      op?: "equal" | "like";
    };

export type DatabaseWhere = {
  [key: string]: DatabaseWhereField;
};

export type DatabaseInclude = {
  [key: string]: {
    type?: "INNER" | "LEFT" | "RIGHT";
    as?: string;
    singular: string;
    select?: DatabaseConfigSelect;
    include?: DatabaseInclude;
    references?: { left: string; right: string };
  };
};

export type DatabaseConfig = {
  select?: DatabaseConfigSelect;
  fn?: Record<string, string>;
  where?: DatabaseWhere;
  include?: DatabaseInclude;
  orderBy?: Record<string, "asc" | "desc">[];
  groupBy?: string[];
};

export interface ListPaginateConfigs extends DatabaseConfig {
  size?: number;
  page?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  prev: number | null;
  next: number | null;
}

export type UpdateBulkData = Record<string, any> & {
  id: string;
};

export enum DATABASE_COLUMNS_TYPE_ENUM {
  "INTEGER" = "INTEGER",
  "TEXT" = "TEXT",
  "BLOB" = "BLOB",
  "REAL" = "REAL",
  "NUMERIC" = "NUMERIC",
}

export type DatabaseCreateTableColumns = Record<
  string,
  DATABASE_COLUMNS_TYPE_ENUM
>;
