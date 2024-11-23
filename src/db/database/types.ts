export type Field<T> = Record<keyof T, SelectField>;
export type SelectField = boolean | { as?: string };
export type DatabaseConfigSelect = {
  [key: string]: SelectField;
};

export type DatabaseWhereFieldValue = string | number | boolean | undefined;
export type DatabaseWhereField =
  | DatabaseWhereFieldValue
  | {
      value: DatabaseWhereFieldValue;
      as?: string;
    };

export type DatabaseWhere = {
  [key: string]: DatabaseWhereField;
};

export type DatabaseInclude = {
  [key: string]: {
    as: string;
    select?: DatabaseConfigSelect;
    include?: DatabaseInclude;
  };
};

export type DatabaseConfig = {
  select?: DatabaseConfigSelect;
  where?: DatabaseWhere;
  include?: DatabaseInclude;
  orderBy?: Record<string, "asc" | "desc">[];
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
