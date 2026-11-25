export type Language = "ar" | "en";

export function localizePath(path: string, language: Language) {
  if (language === "ar" || !path.startsWith("/") || path.startsWith("//")) return path;
  return path === "/" || /^\/[?#]/.test(path) ? `/en${path.slice(1)}` : `/en${path}`;
}

export function withoutLanguagePrefix(pathname: string) {
  return pathname.replace(/^\/en(?=\/|$)/, "") || "/";
}
