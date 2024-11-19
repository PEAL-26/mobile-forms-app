import { createSlug } from "./slug";

export async function downloadWithUrl(url: string) {
  return fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const urlBlob = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = urlBlob;
      link.download = url.substring(url.lastIndexOf("/"));
      link.click();
      window.URL.revokeObjectURL(urlBlob);
    });
}

export async function downloadWithBlob(blob: Blob) {
  const urlBlob = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = urlBlob;
  link.click();
  window.URL.revokeObjectURL(urlBlob);
}

export async function downloadBase64JVB(str: string, filename = "PDF_File", type='pdf') {
  // Verifica se a string não está vazia e possui um formato válido
  if (!str || typeof str !== "string") {
    throw new Error(
      "A string fornecida não é um base64 válido para um arquivo PDF."
    );
  }

  const data = `data:application/pdf;base64,${str}`;

  // Cria um link para fazer o download
  const downloadLink = document.createElement("a");
  downloadLink.href = data;
  downloadLink.download = `${createSlug(filename).toUpperCase()}.${type}`;
  downloadLink.target = "_blank";

  // Simula o clique no link para iniciar o download
  downloadLink.click();
}
