import { ConfigService } from "./ConfigService";
import { cookies } from "next/headers";
import { deepMerge } from "@/lib/utils";

export interface IGenericRequestError {
  status: number;
  error: unknown;
  code: string;
}

export interface IFetchResponse<ResponseType> {
  status: number;
  error?: string;
  data?: ResponseType;
}

class RequestServiceClass {
  private buildAccessTokenHeader() {
    const config = ConfigService.getConfig();
    const accessToken = cookies().get(config.accessTokenKey);

    if (!accessToken) return {};

    return {
      headers: {
        "Content-Type": "application/json",
        [config.authHeader || "X-Auth"]: `Bearer ${accessToken.value}`,
      },
    };
  }

  public async fetch<ResponseType>(
    input: string | URL | globalThis.Request,
    init?: RequestInit
  ): Promise<IFetchResponse<ResponseType>> {
    const config = ConfigService.getConfig();

    const fetchConfig = deepMerge(
      { ...config.fetchConfig },
      { ...init },
      this.buildAccessTokenHeader()
    );

    const fullPath = `${config.fetchConfig.baseUrl}${input}`;

    try {
      const response = await fetch(fullPath, fetchConfig);
      if (!response.ok) {
        return {
          status: response.status,
          error: response.statusText,
        };
      }
      const { data } = (await response.json()) as { data: ResponseType };
      return {
        status: response.status,
        data,
      };
    } catch (error) {
      console.log(error);

      return {
        status: 500,
        error: (error as string) || "GENERIC_ERROR",
      };
    }
  }
}

const RequestService = new RequestServiceClass();
export { RequestService };
