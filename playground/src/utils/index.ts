export function ToArray(str: string | string[]): any[] {
  if (Array.isArray(str)) return str;
  if (typeof str !== "string") return;
  if (str.indexOf(",") == -1) return;
  return str.split(",");
}
