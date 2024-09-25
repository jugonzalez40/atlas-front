import merge from "lodash.merge";

import { IAtlasService } from "types/config";

import { config as configDefault } from "config/default";
import { config as configLocal } from "config/local";
import { config as configMock } from "config/mock";

type ConfigKeys = "default" | "local" | "mock"; // Define the allowed keys

const env = process.env.NODE_ENV as ConfigKeys;
// const DEFAULT_CONFIG_NAME = "default";

class ConfigServiceClass implements IAtlasService {
  public async load() {
    await this.setConfig();
  }

  public getInstance() {
    return global.___ATLAS_CONFIG___;
  }

  private async setConfig() {
    try {
      const configModules = {
        default: configDefault,
        local: configLocal,
        mock: configMock,
      };

      const config = configModules[`${env}`];

      const defaultConfig = configModules.default;

      global.___ATLAS_CONFIG___ = merge(defaultConfig, config) || defaultConfig;
    } catch (error) {
      console.log("CONFIG_SERVICE", "Could read config");
      console.log(error);
    }
  }

  // private async setConfig() {
  //   try {
  //     const configFolder = path.resolve(__dirname, "../config/");
  //     const files = await fs.readdirSync(configFolder);

  //     const configModules = await Promise.all(
  //       files.map(async (file) => {
  //         const configModule = await import(path.join(configFolder, `${file}`));
  //         return [file, configModule];
  //       })
  //     );

  //     const [, config] =
  //       configModules.find(([name]) => (name as string).startsWith(env)) || [];

  //     const [, defaultConfig] =
  //       configModules.find(([name]) =>
  //         (name as string).startsWith(DEFAULT_CONFIG_NAME)
  //       ) || [];

  //     global.___ATLAS_CONFIG___ = merge(defaultConfig, config) || defaultConfig;
  //   } catch (error) {
  //     console.log("CONFIG_SERVICE", "Could read config");
  //     console.log(error);
  //   }
  // }
}

const ConfigService = new ConfigServiceClass();
export { ConfigService };
