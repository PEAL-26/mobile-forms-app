import {
  DatabaseConfig,
  Field,
  ListPaginateConfigs,
  PaginatedResult,
} from "./types";

export abstract class IDatabase {
  abstract query<T>(sql: string): Promise<T[]>;
  abstract listAll<T>(
    tableName: string,
    configs?: DatabaseConfig
  ): Promise<T[]>;
  abstract listPaginate<T>(
    tableName: string,
    configs?: ListPaginateConfigs
  ): Promise<PaginatedResult<T>>;
  abstract listAllEach<T>(
    tableName: string,
    configs?: ListPaginateConfigs
  ): AsyncIterableIterator<T>;
  abstract insert<T>(data: Record<string, any>): Promise<T>;
  abstract update<T>(data: Record<string, any>, id: string): Promise<T>;
  abstract delete<T>(id: string): Promise<T>;
  abstract select<T>(fields: Field<T>, tableName: string): Promise<T[]>;
  abstract getFirst<T>(
    tableName: string,
    configs?: DatabaseConfig
  ): Promise<T | null>;
}
