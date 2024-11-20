export type Field<T> = Record<keyof T, SelectField>;
export type SelectField = boolean | { as?: string };
export type DatabaseConfigSelect = {
  [key: string]: SelectField;
};
export type DatabaseConfig = {
  select?: DatabaseConfigSelect;
  where?: Record<string, any>;
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
