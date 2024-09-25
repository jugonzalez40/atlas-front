import axios, { CreateAxiosDefaults } from "axios";
import { IAtlasService } from "types/config";
import merge from "lodash.merge";

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
}

const RequestService = new RequestServiceClass();
export { RequestService };
