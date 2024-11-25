import * as XLSX from "xlsx";

export function exportToExcel<T>(data: T[], name: string) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, name);
  const excelFile = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
  
  return excelFile;
}
