import { SQLiteDatabase } from "expo-sqlite";
import { IDatabase } from "./interfaces";
import {
  DatabaseConfig,
  Field,
  ListPaginateConfigs,
  PaginatedResult,
} from "./types";
import { generateQueryFields, generateWhereClause } from "./utils";

export class DatabaseSQLite implements IDatabase {
  constructor(private connection: SQLiteDatabase) {}

  async query<T>(sql: string): Promise<T[]> {
    throw new Error("Method not implemented.");
  }

  async insert<T>(data: Record<string, any>): Promise<T> {
    // const result = await this.connection.runAsync("");
    throw new Error("Method not implemented.");
  }
  update<T>(data: Record<string, any>, id: string): Promise<T> {
    throw new Error("Method not implemented.");
  }
  delete<T>(id: string): Promise<T> {
    throw new Error("Method not implemented.");
  }
  select<T>(fields: Field<T>, tableName: string): Promise<T[]> {
    throw new Error("Method not implemented.");
  }

  listAll<T>(tableName: string, configs?: DatabaseConfig): Promise<T[]> {
    const { select, where } = configs || {};
    const fields = generateQueryFields(select);
    return this.connection.getAllAsync(`SELECT ${fields} FROM ${tableName}`);
  }

  async listPaginate<T>(
    tableName: string,
    configs?: ListPaginateConfigs
  ): Promise<PaginatedResult<T>> {
    const { select, where, size = 10, page = 1 } = configs || {};
    const fields = generateQueryFields(select);
    const offset = (page - 1) * size;

    const whereClause = generateWhereClause(where);
    const baseQuery = `SELECT ${fields} FROM ${tableName} ${whereClause}`;

    // Consulta para contar o total de itens
    const totalItemsQuery = `SELECT COUNT(*) as count FROM (${baseQuery}) as total_count_query`;
    const totalItemsResult = await this.connection.getAllAsync<{
      count: number;
    }>(totalItemsQuery);
    const totalItems = parseInt(String(totalItemsResult[0].count), 10);

    // Consulta para obter os dados paginados
    const paginatedQuery = `${baseQuery} LIMIT ${size} OFFSET ${offset}`;
    const data = await this.connection.getAllAsync<T>(paginatedQuery);

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