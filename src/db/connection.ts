interface Db {
    
}

let db: Db | null = null;

if (typeof window !== "undefined") {
}

if (typeof window === "undefined") {
//   const SQLite = require("expo-sqlite");
//   const { drizzle } = require("drizzle-orm/expo-sqlite");

//   const expo = SQLite.openDatabaseSync("db.db");
//   db = drizzle(expo);
}

/*
import { openDatabaseSync } from "expo-sqlite/next";
import * as expo from "drizzle-orm/expo-sqlite";
import * as schema from "./schemas";

export const DATABASE_NAME = "database.db";
export const connection = openDatabaseSync(DATABASE_NAME);
export const db = expo.drizzle(connection, { schema, logger: true });
*/

export { db };
