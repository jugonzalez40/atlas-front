import { IUser } from "@/domains/login/core/use-cases/authenticate.server";
import { AxiosInstance, CreateAxiosDefaults } from "axios";

export interface IAtlasConfig {
  axiosConfig: CreateAxiosDefaults;
  accessTokenKey: string;
  authHeader: string;
  user?: IUser
}

export interface IAtlasInstances {
  axiosInstance: AxiosInstance;
}

export interface IAtlasService<T = null, U = void> {
  load: (args: T) => Promise<void>;
  getInstance: () => U;
}
