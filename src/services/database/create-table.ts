import { db } from "@/db";
import {
  generateCreateTableScript,
  DatabaseCreateTableColumns,
} from "@/db/database";

export async function createDataTableService(
  tableName: string,
  columns: DatabaseCreateTableColumns
) {
  const sql = generateCreateTableScript(tableName, columns);
  await Promise.all([
    db.query(sql),
    db.insert("data_tables", { name: tableName }),
  ]);
}
