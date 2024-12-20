import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
// import { cities, provinces } from "../../drizzle/sql";
import { cities, provinces } from "@/db/region.json";
import { fieldsSeed, formsSeed, sectionsSeed } from "@/db/data";

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
        const [
          [province],
          [city],
          [formsField],
          [section],
          [form],
          [dataTable],
        ] = await Promise.all([
          connection.all<{ count: number }>(
            "select count(*) as count from provinces"
          ),
          connection.all<{ count: number }>(
            "select count(*) as count from cities"
          ),
          connection.all<{ count: number }>(
            "select count(*) as count from forms_fields"
          ),
          connection.all<{ count: number }>(
            "select count(*) as count from sections"
          ),
          connection.all<{ count: number }>(
            "select count(*) as count from forms"
          ),
          connection.all<{ count: number }>(
            "select count(*) as count from data_tables"
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

        if (section.count === 0) {
          await Promise.all(
            sectionsSeed.map((section) =>
              connection.run(
                `INSERT INTO  sections (id, name, description) VALUES (${
                  section.id
                }, "${section.name}", ${
                  section.description ? `"${section.description}"` : null
                });`
              )
            )
          );
        }

        if (form.count === 0) {
          await Promise.all(
            formsSeed.map((form) =>
              connection.run(
                `INSERT INTO  forms (id, name, description) VALUES (${
                  form.id
                }, "${form.name}", ${
                  form.description ? `"${form.description}"` : null
                });`
              )
            )
          );
        }

        if (dataTable.count === 0) {
          await Promise.all(
            [
              { name: "provinces", columns: "id; name" },
              { name: "cities", columns: "id; name; province_id" },
              { name: "formations", columns: "id; name; level" },
            ].map(({ name, columns }, index) =>
              connection.run(
                `INSERT INTO  data_tables (id, name, columns) VALUES (${
                  index + 1
                }, "${name}", "${columns}");`
              )
            )
          );
        }

        if (formsField.count === 0) {
          await Promise.all(
            fieldsSeed.map((field) => {
              return connection.run(
                `INSERT INTO  forms_fields (id, form_id, section_id, display, type, identifier, data, data_where, extra_field, description) VALUES (${
                  field.id
                }, ${field.formId}, ${field.sectionId}, "${field.display}", "${
                  field.type
                }", "${field.identifier}", ${
                  field.data ? `'${field.data}'` : null
                }, ${field.dataWhere ? `'${field.dataWhere}'` : null}, ${
                  field.extraField ? `'${field.extraField}'` : null
                }, ${field.description ? `"${field.description}"` : null});`
              );
            })
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

function stringNullable(value: string | undefined | null) {
  return value ? `"${value}"` : null;
}
