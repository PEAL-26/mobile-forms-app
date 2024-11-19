// eslint-disable-next-line @typescript-eslint/no-var-requires
const unidecode = require('unidecode');

export function createSlug(input: string): string {
  //Converte os dados em UTF-8 em caracteres US-ASCII
  const slug = unidecode(input);

  return slug
    .toLowerCase() // Converte para minúsculas
    .replace(/[^a-zA-Z0-9-]+/g, '-') // Remove caracteres especiais, exceto hífenes
    .replace(/^-+|-+$/g, '') // Remove hífenes no início e no final
    .replace(/--+/g, '-') // Substitui múltiplos hífenes por um único hífen
    .trim(); // Remove espaços em branco no início e no final
}
