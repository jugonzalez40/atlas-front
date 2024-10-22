import { IAtlasConfig } from "types/config";

export const config: Partial<IAtlasConfig> = {
  axiosConfig: {
    baseURL: "http://localhost:3000",
  },
} satisfies Partial<IAtlasConfig>;
