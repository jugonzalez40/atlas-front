import axios, {
  AxiosError,
  AxiosResponse,
  CreateAxiosDefaults,
  isAxiosError,
} from "axios";
import { IAtlasService } from "types/config";
import merge from "lodash.merge";

import camelcaseKeysDeep from "camelcase-keys-deep";

export interface IGenericRequestError {
  status: number;
  error: string;
  code: string;
}

export const GENERIC_ERROR = {
  status: 500,
  error: "An unexpected error occurred",
  code: "GENERIC_ERROR",
};

// const FETCH_LIBRARY = "axios";
// const FETCH_LIBRARY = "fetch";

class RequestServiceClass implements IAtlasService<CreateAxiosDefaults> {
  private onSuccessResponse(response: AxiosResponse) {
    return camelcaseKeysDeep(response) as AxiosResponse;
  }

  private onErrorResponse(error) {
    // do something

    return Promise.reject(camelcaseKeysDeep(error));
  }

  public async load(customConfig?: CreateAxiosDefaults) {
    const axiosGlobalConfig = global.___ATLAS_CONFIG___.axiosConfig;

    const axiosInstance = axios.create(merge(axiosGlobalConfig, customConfig));

    axiosInstance.interceptors.response.use(
      this.onSuccessResponse,
      this.onErrorResponse
    );

    global.___ATLAS_INSTANCES___ = {
      ...(global.___ATLAS_INSTANCES___ || {}),
      axiosInstance,
    };
  }

  public getInstance() {
    return global.___ATLAS_INSTANCES___?.axiosInstance;
  }

  public buildError(error: unknown): IGenericRequestError {
    if (isAxiosError(error)) {
      const payload = error as AxiosError;
      return {
        status: payload.status || GENERIC_ERROR.status,
        error: payload.message || GENERIC_ERROR.error,
        code: payload.code || GENERIC_ERROR.code,
      };
    }

    return GENERIC_ERROR;
  }

  public async fetch(
    input: string | URL | globalThis.Request,
    init?: RequestInit
  ){


    init.



    return (await fetch(input, init)).json();
  }
}

const RequestService = new RequestServiceClass();
export { RequestService };
