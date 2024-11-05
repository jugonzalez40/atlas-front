import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCookie(name: string) {
  const allCookies = document.cookie;
  const specificCookie = allCookies
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
  return specificCookie || "";
}

export function getJSONCookie<TCookieFormat>(name: string) {
  const specificCookie = getCookie(name);
  const decodedCookie = decodeURIComponent(specificCookie);
  return JSON.parse(decodedCookie || "{}") as TCookieFormat;
}

export function deepMerge(target: any, ...sources: any[]): any {
  if (!sources.length) return target;
  const source = sources.shift();

  if (typeof target === "object" && typeof source === "object") {
    for (const key in source) {
      if (typeof source[key] === "object" && !Array.isArray(source[key])) {
        if (!target[key]) target[key] = {};
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  return deepMerge(target, ...sources);
}

export function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

export function injectValueInList(list: string[], value: string) {
  if (list.includes(value)) return list;
  return [value, ...list];
}
