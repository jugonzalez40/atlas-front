import { IAtlasConfig } from "types/config";

export const config = {
  axiosConfig: {
    baseURL: "http://192.168.0.24:8080/api",
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 2000
  },
} satisfies IAtlasConfig;
