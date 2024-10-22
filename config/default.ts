import { IAtlasConfig } from "types/config";

export const config: IAtlasConfig = {
  axiosConfig: {
    baseURL: "http://192.168.0.18:8080",
    // baseURL: "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 2000,
  },
  accessTokenKey: "access_token",
  authHeader: "x-Authorization",
  fetchConfig: {
    // baseUrl: "http://192.168.0.18:8080",
    baseUrl: "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
    },
    // signal: AbortSignal.abort(2000),
  },
};
