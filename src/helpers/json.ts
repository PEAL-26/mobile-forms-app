export function parseJSON<T>(data?: string): T | undefined {
  if (!data) return undefined;

  try {
    return JSON.parse(String(data));
  } catch (error: any) {
    throw new Error(`JSONParse: ${data} \n ${error.message}`);
  }
}
