import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";

type Field = Record<string, any>;

export abstract class IDatabase {
  abstract query<T>(sql: string): Promise<T[]>;
  abstract insert<T>(data: Record<string, any>): Promise<T>;
  abstract update<T>(data: Record<string, any>, id: string): Promise<T>;
  abstract delete<T>(id: string): Promise<T>;
  abstract select<T>(fields: Field, tableName: string): Promise<T[]>;
}

export class DatabaseMySql implements IDatabase {
  constructor() {}
  query<T>(sql: string): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
  insert<T>(data: Record<string, any>): Promise<T> {
    throw new Error("Method not implemented.");
  }
  update<T>(data: Record<string, any>, id: string): Promise<T> {
    throw new Error("Method not implemented.");
  }
  delete<T>(id: string): Promise<T> {
    throw new Error("Method not implemented.");
  }
  select<T>(fields: Field, tableName: string): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
}

export class DatabaseSQLite implements IDatabase {
  constructor(
    private connection: ExpoSQLiteDatabase<Record<string, never>> & {
      $client: SQLiteDatabase;
    }
  ) {}

  async query<T>(sql: string): Promise<T[]> {
    const result = this.connection.run(sql);
    console.log({ result });
    return [];
  }

  insert<T>(data: Record<string, any>): Promise<T> {
    throw new Error("Method not implemented.");
  }
  update<T>(data: Record<string, any>, id: string): Promise<T> {
    throw new Error("Method not implemented.");
  }
  delete<T>(id: string): Promise<T> {
    throw new Error("Method not implemented.");
  }
  select<T>(fields: Field, tableName: string): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
}

let db: any;
export async function query<T>(sql: string) {
  return new Promise((resolver, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(sql, [], (tx: any, results: any) => {
        const rows = results.rows.raw() as T[];
        resolver(rows);
      });
    });
  });
}
