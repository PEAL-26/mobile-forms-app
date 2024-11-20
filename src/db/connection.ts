import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import { DatabaseSQLite } from "./database";

export const DATABASE_NAME = "db.db";

export const expoOpenDatabase = openDatabaseSync(DATABASE_NAME);
export const connectionDrizzle = drizzle(expoOpenDatabase);

export const db = new DatabaseSQLite(expoOpenDatabase);
