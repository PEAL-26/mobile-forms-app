// import { db } from "@/db";

import { db } from "@/db";

export enum DataType {
  Table = "table",
  Array = "array",
}

type Config = {
  dataFields?: string;
  dataWhere?: string;
};

export type DataTableResponse = {
  id: string;
  title: string;
};

export async function getData(data?: string, configs?: Config) {
  if (!data) return [];

  const { type, values = "" } = getTypeAndValues(data) || {};

  if (type === DataType.Table) {
    if (!configs?.dataFields) {
      throw new Error("Data type {table} is required set dataFields");
    }
    const query = createQuery(values, configs);
    const data = await getDataTable(query);
    console.log(data);

    return data;
  }

  if (type === DataType.Array) {
    return paseArray(values);
  }

  return [];
}

export function getTypeAndValues(data?: string) {
  if (!data) return null;

  const dataSplitted = data.split(":");
  const type = dataSplitted[0]?.trim() as DataType;
  let values = "";

  if (type === DataType.Table) {
    values = dataSplitted[1]?.trim() || "";
  }

  if (type === DataType.Array) {
    values = data.replace("array:", "").trim();
  }

  return { type, values };
}

function paseArray(value: string) {
  // Remove os parentese no início e no final
  const data = value.substring(1, value.length - 1);
  const dataSplitted = data.split(";;");
  const array = dataSplitted.filter((d) => d.trim());
  return array;
}

function createQuery(tableName: string, configs?: Config) {
  let fields = "*";

  if (configs?.dataFields) {
    try {
      const parse = JSON.parse(String(configs.dataFields));
      fields = `${parse.identifier} as id, ${parse.title} as title`;
    } catch (error: any) {
      throw new Error(
        `JSONParse: ${tableName} => ${configs.dataFields} \n ${error.message}`
      );
    }
  }

  return `select ${fields} from ${tableName}`;
}

async function getDataTable(sql: string) {
  // if (!db) {
  //   throw new Error("Database not set");
  // }
  try {
    const data = await db.query<DataTableResponse>(sql);
    return data;
  } catch (error) {
    console.error(error);
  }

  return [];
}
