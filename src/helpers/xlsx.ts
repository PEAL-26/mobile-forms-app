import * as XLSX from "xlsx";

export function exportToExcel<T>(data: T[]) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "data-collection");
  const excelFile = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

  return excelFile;
}