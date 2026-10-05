export function normalizeInstancePath(instancePath: string): string {
  if (!instancePath) return "root";
  return instancePath.replace(/^\//, "").replace(/\//g, ".");
}
