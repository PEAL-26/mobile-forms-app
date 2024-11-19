import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import { DatabaseSQLite } from "./database";

export const DATABASE_NAME = "db.db";

const expo = openDatabaseSync(DATABASE_NAME);
const connection = drizzle(expo);

export const db = new DatabaseSQLite(connection);
