import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "../../drizzle/migrations";
// import { db } from "@/db";

export function useConnection() {
  // const { success, error } = useMigrations(db, migrations);

  // return { db, success, error };
}
