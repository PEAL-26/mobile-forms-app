// import { db } from "@/db";

import { db } from "@/db";
import { DatabaseConfig, DatabaseConfigSelect } from "@/db/database";
import { parseJSON } from "@/helpers/json";

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
    const dataTableConfigs = getDataTableConfigs(configs);
    const data = await getDataTable(values, dataTableConfigs);
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

type Field = {
  identifier: string;
  title: string;
};
function getDataTableConfigs(configs: Config) {
  const { dataFields, dataWhere } = configs;

  let fieldObj: DatabaseConfigSelect = {};
  const fieldsParse = parseJSON<Field>(dataFields);

  if (fieldsParse) {
    fieldObj[fieldsParse.identifier] = {
      as: "id",
    };
    fieldObj[fieldsParse.title] = {
      as: "title",
    };
  }

  return { select: fieldObj, where: {} };
}

async function getDataTable(tableName: string, configs: DatabaseConfig) {
  try {
    return db.listAll<DataTableResponse>(tableName, configs);
  } catch (error) {
    console.error(`getDataTableError: ${JSON.stringify(error)}`);
  }

  return [];
}
