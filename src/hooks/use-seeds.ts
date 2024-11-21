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
        const [[province], [city], [formsField], [section], [form]] =
          await Promise.all([
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
                }, "${section.name}", ${stringNullable(section.description)});`
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
                }, "${form.name}", ${stringNullable(form.description)});`
              )
            )
          );
        }

        if (formsField.count === 0) {
          await Promise.all(
            fieldsSeed.map((field) =>
              connection.run(
                `INSERT INTO  forms_fields (id, form_id, section_id, display, type, identifier, data, data_fields, data_where, extra_field, description) VALUES (${
                  field.id
                }, ${field.formId}, ${field.sectionId}, "${field.display}", "${
                  field.type
                }", "${field.identifier}", ${stringNullable(
                  field.data
                )}, ${stringNullable(field.dataFields)}, ${stringNullable(
                  field.dataWhere
                )}, ${stringNullable(field.extraField)}, ${stringNullable(
                  field.description
                )});`
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

function stringNullable(value: string | undefined | null) {
  return value ? `"${value.replaceAll('"', "'")}"` : null;
}
