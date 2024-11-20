import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
// import { cities, provinces } from "../../drizzle/sql";
import { cities, provinces } from "@/db/region.json";

interface Props {
  connection: ExpoSQLiteDatabase<Record<string, never>> & {
    $client: SQLiteDatabase;
  };
  migrated: boolean;
}

export function useSeeds(props: Props) {
  const { connection, migrated } = props;
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<any>(undefined);

  const seed = useCallback(async () => {
    try {
      if (migrated) {
        const [[province], [city]] = await Promise.all([
          connection.all<{ count: number }>(
            "select count(*) as count from provinces"
          ),
          connection.all<{ count: number }>(
            "select count(*) as count from cities"
          ),
        ]);

        if (province.count === 0) {
          await Promise.all(
            provinces.map((province) =>
              connection.run(
                `INSERT INTO provinces (id, name) VALUES (${province.id}, "${province.name}");`
              )
            )
          );
        }

        if (city.count === 0) {
          await Promise.all(
            cities.map((city) =>
              connection.run(
                `INSERT INTO cities (id, name, province_id) VALUES (${city.id}, "${city.name}", ${city.provinceId});`
              )
            )
          );
        }

        setSuccess(true);
        setError(undefined);
      }
    } catch (error: any) {
      setSuccess(false);
      setError({ message: "Falha ao semear os dados" });
      console.error(error);
    }
  }, [connection, migrated]);

  useEffect(() => {
    seed();
  }, [seed]);

  return { success, error };
}
