import { db } from "@/db";

export type GetInfoTableParams = {
  query?: string;
  size?: number;
  page?: number;
};

export type GetInfoTableResponseData = {
  cid: number;
  name: string;
  type: string;
  notnull: boolean;
  dflt_value: any;
  pk: boolean;
};

export async function getInfoTableService(tableName: string) {
  return db.query<GetInfoTableResponseData>(
    `PRAGMA table_info("${tableName}");`
  );
}
