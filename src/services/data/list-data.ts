import { DATA_TYPE_ENUM, db } from "@/db";
import { PaginatedResult, setNestedValue } from "@/db/database";

type DataWhere = {
  parent_field?: string | null;
  child_field?: string | null;
  parent_identifier?: string | null;
  value?: any | null;
};

type Params = {
  query?: string;
  page?: number;
  size?: number;
  dataWhere?: DataWhere | null;
};

type DataRequest = {
  type: DATA_TYPE_ENUM;
  src?: any;
};

type DataResponse = {
  id: any;
  title: string;
};

export async function generateData(data?: string | null, params?: Params) {
  if (!data) return {} as PaginatedResult<DataResponse>;
  const { query = "", page = 1, size = 10, dataWhere } = params || {};
  const parseData = JSON.parse(JSON.stringify(data)) as DataRequest;

  if (parseData.type === DATA_TYPE_ENUM.list) {
    const newData: DataResponse[] = parseData?.src || [];
    return paginateArray<DataResponse>(newData, page, size, query);
  }

  if (parseData.type === DATA_TYPE_ENUM.data_table) {
    if (parseData.src) {
      const [table, fieldId, fieldTitle] = parseData.src
        .split(";")
        .map((value: string) => value.trim());
      const [id, idAS] = fieldId
        .split("as")
        .map((value: string) => value.trim());
      const [title, titleAS] = fieldTitle
        .split("as")
        .map((value: string) => value.trim());

      let select = {};
      setNestedValue(select, `${id}.as`, idAS);
      setNestedValue(select, `${title}.as`, titleAS);

      let where = {};
      setNestedValue(where, `${title}.as`, `${table}_${titleAS}`);
      setNestedValue(where, `${title}.op`, "like");
      setNestedValue(where, `${title}.value`, query);

      if (dataWhere) {
        setNestedValue(
          where,
          `${dataWhere.child_field}.value`,
          dataWhere.value
        );
      }

      return db.listPaginate<DataResponse>(table, {
        select,
        where,
      });
    }
  }

  return {} as PaginatedResult<DataResponse>;
}

async function paginateArray<T>(
  array: { id: any; title: string }[],
  page: number,
  itemsPerPage: number,
  query = ""
): Promise<PaginatedResult<T>> {
  // Filtrar os dados pelo título
  const filteredArray = array.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const totalItems = filteredArray.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const data = filteredArray.slice(startIndex, endIndex) as T[];

  return {
    data,
    totalItems,
    totalPages,
    currentPage,
    prev: currentPage > 1 ? currentPage - 1 : null,
    next: currentPage < totalPages ? currentPage + 1 : null,
  };
}
