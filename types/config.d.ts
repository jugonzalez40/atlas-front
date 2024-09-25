import { AxiosInstance, CreateAxiosDefaults } from "axios";

export interface IAtlasConfig {
  axiosConfig: CreateAxiosDefaults;
}

export interface IAtlasInstances {
  axiosInstance: AxiosInstance;
}

export interface IAtlasService<T = null, U = void> {
  load: (...args: T[]) => Promise<void>;
  getInstance: () => U;
}
