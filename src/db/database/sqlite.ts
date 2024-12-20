import { SQLiteDatabase } from "expo-sqlite";
import { IDatabase } from "./interfaces";
import {
  DatabaseConfig,
  Field,
  ListPaginateConfigs,
  PaginatedResult,
  UpdateBulkData,
} from "./types";
import {
  fieldsMap,
  generateCreateFields,
  generateIncludes,
  generateQueryFields,
  generateQuerySql,
  generateWhereClause,
  join,
  serialize,
} from "./utils";

export class DatabaseSQLite implements IDatabase {
  constructor(private connection: SQLiteDatabase) {}

  async query<T>(sql: string): Promise<T[]> {
    return this.connection.getAllAsync(sql);
  }

  async insert<T>(tableName: string, data: Record<string, any>): Promise<T> {
    const { fields, values } = generateCreateFields(data);

    const result = await this.connection.runAsync(
      `INSERT INTO ${tableName} (${fields.join(", ")}) VALUES (${join(
        values,
        ", "
      )});`
    );

    data.id = result.lastInsertRowId;

    return data as T;
  }

  async insertBulk(
    tableName: string,
    data: Record<string, any>[]
  ): Promise<void> {
    await Promise.all(
      data.map((item) => {
        const { fields, values } = generateCreateFields(item);
        let sql = `INSERT INTO ${tableName} (${fields.join(
          ", "
        )}) VALUES (${join(values, ", ")});`;
        return this.connection.runAsync(sql);
      })
    );
  }

  update<T>(
    tableName: string,
    data: Record<string, any>,
    id: string
  ): Promise<T> {
    throw new Error("Method not implemented.");
  }

  updateBulk<T>(tableName: string, data: UpdateBulkData[]): Promise<T[]> {
    throw new Error("Method not implemented.");
  }

  async delete(tableName: string, where: Record<string, any>): Promise<void> {
    const whereClause = generateWhereClause(where);
    await this.connection.execAsync(`DELETE FROM ${tableName} ${whereClause}`);
  }

  async getFirst<T>(
    tableName: string,
    configs?: DatabaseConfig
  ): Promise<T | null> {
    const { select, where, include } = configs || {};
    const fields = generateQueryFields(select);
    const includes = generateIncludes(tableName, include);
    const whereClause = generateWhereClause(where);
    const includesFields =
      includes.fields.length > 0
        ? `, ${fieldsMap(includes.fields, includes.tables)}`
        : "";
    const query = `SELECT ${fieldsMap(fields, [
      tableName,
    ])}${includesFields} FROM ${tableName} ${includes.joins} ${whereClause}`;

    const result = await this.connection.getAllAsync<T>(query);
    if (result.length === 0) return null;

    return serialize(result[0], [tableName, ...includes.tables]) as T;
  }

  select<T>(fields: Field<T>, tableName: string): Promise<T[]> {
    throw new Error("Method not implemented.");
  }

  async listAll<T>(tableName: string, configs?: DatabaseConfig): Promise<T[]> {
    const { baseQuery, includes } = generateQuerySql(tableName, configs);
    const result = await this.connection.getAllAsync<T>(baseQuery);
    const data = result.map(
      (item) => serialize(item, [tableName, ...includes.tables]) as T
    );

    return data;
  }

  async listPaginate<T>(
    tableName: string,
    configs?: ListPaginateConfigs
  ): Promise<PaginatedResult<T>> {
    const { size = 10, page = 1 } = configs || {};

    const offset = (page - 1) * size;
    const { baseQuery, includes } = generateQuerySql(tableName, configs);

    // Consulta para contar o total de itens
    const totalItemsQuery = `SELECT COUNT(*) as count FROM (${baseQuery}) as total_count_query`;
    const totalItemsResult = await this.connection.getAllAsync<{
      count: number;
    }>(totalItemsQuery);
    const totalItems = parseInt(String(totalItemsResult[0].count), 10);

    // Consulta para obter os dados paginados
    const paginatedQuery = `${baseQuery} LIMIT ${size} OFFSET ${offset}`;
    const result = await this.connection.getAllAsync<T>(paginatedQuery);
    const data = result.map(
      (item) => serialize(item, [tableName, ...includes.tables]) as T
    );

    // Calcular informações de paginação
    const totalPages = Math.ceil(totalItems / size);
    const prev = page > 1 ? page - 1 : null;
    const next = page < totalPages ? page + 1 : null;

    return {
      data,
      totalItems,
      totalPages,
      currentPage: page,
      prev,
      next,
    };
  }

  listAllEach<T>(
    tableName: string,
    configs?: DatabaseConfig
  ): AsyncIterableIterator<T> {
    throw new Error("Method not implemented.");
    // const { select, where } = configs || {};
    // const fields = generateQueryFields(select);
    // return this.connection.getEachAsync(`SELECT ${fields} FROM ${tableName}`);
  }
}
