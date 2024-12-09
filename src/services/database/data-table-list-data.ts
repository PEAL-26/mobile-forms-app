import { db } from "@/db";

export type DataTableListDataParams = {
  query?: string;
  size?: number;
  page?: number;
};

export type DataTableListDataRequest = {
  table: string;
  columns?: string;
};

export type DataTableListDataResponseData = any;

export async function dataTableListDataService(
  props: DataTableListDataRequest,
  params?: DataTableListDataParams
) {
  const { table, columns } = props;
  const { page, size, query } = params || {};

  let select: Record<string, any> | undefined = undefined;

  if (columns) {
    select = {};
    columns.split(";").forEach((column) => {
      if (select) {
        select[column.trim()] = true;
      }
    });
  }

  return db.listPaginate<DataTableListDataResponseData>(table, {
    select,
    page,
    size,
    // where: {
    //   name: {
    //     op: "like",
    //     value: query,
    //   },
    // },
  });
}
