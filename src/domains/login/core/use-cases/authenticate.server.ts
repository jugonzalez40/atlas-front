"use server";

import { IGenericOutput } from "@/hooks/useFetch";
import { ConfigService } from "@/services/ConfigService";
import { GENERIC_ERROR, RequestService } from "@/services/RequestService";
import { AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface IAuthInput {
  email: string;
  password: string;
}

export interface IAuthOutput extends IGenericOutput {
  token?: string;
}

type AuthAxiosResponse = AxiosResponse<IAuthOutput>;

const fetchAuth = async (
  input: IAuthInput
): Promise<AuthAxiosResponse | IGenericOutput> => {
  const fetch = RequestService.getInstance();

  // return await fetch.post<IAuthOutput>("/auth?status=401", input);
  return await fetch
    .post<IAuthOutput>("/auth?status=200", input)
    .catch(RequestService.buildError);
};

const setAuthTokenHeader = (token: string) => {
  ConfigService.load({
    axiosConfig: {
      headers: {
        "X-Auth": `Bearer ${token}`,
      },
    },
  });
};

export async function authenticate(input: IAuthInput): Promise<IAuthOutput> {
  const result = await fetchAuth(input);

  if (result.status === 200) {
    const { data } = result as AuthAxiosResponse;
    if (!data.token) return GENERIC_ERROR;

    setAuthTokenHeader(data.token);
    cookies().set("auth_token", data.token);
    redirect("/home");
  }

  return (result as AuthAxiosResponse).data || (result as IAuthOutput);
}
