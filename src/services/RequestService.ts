import axios, { AxiosError, CreateAxiosDefaults } from "axios";
import { IAtlasService } from "types/config";
import merge from "lodash.merge";

export interface IGenericRequestError {
  status: number;
  error: string;
  code: string;
}

class RequestServiceClass implements IAtlasService<CreateAxiosDefaults> {
  public async load(customConfig?: CreateAxiosDefaults) {
    const axiosGlobalConfig = global.___ATLAS_CONFIG___.axiosConfig;

    global.___ATLAS_INSTANCES___ = {
      ...(global.___ATLAS_INSTANCES___ || {}),
      axiosInstance: axios.create(merge(axiosGlobalConfig, customConfig)),
    };
  }

  public getInstance() {
    return global.___ATLAS_INSTANCES___.axiosInstance;
  }

  public buildError(payload: AxiosError): IGenericRequestError {
    return {
      status: payload.status || 500,
      error: payload.message || "",
      code: payload.code || "GENERIC_ERROR",
    };
  }
}

const RequestService = new RequestServiceClass();
export { RequestService };
