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
