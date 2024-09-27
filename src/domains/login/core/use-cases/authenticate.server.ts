"use server";


import { IGenericOutput } from "@/hooks/useFetch";
import { ConfigService } from "@/services/ConfigService";
import { RequestService } from "@/services/RequestService";
import { AxiosResponse, isAxiosError } from "axios";
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

const GENERIC_ERROR = {
  status: 500,
  error: "An unexpected error occurred",
};

const fetchAuth = async (
  input: IAuthInput
): Promise<AuthAxiosResponse | IGenericOutput> => {
  const fetch = RequestService.getInstance();
  try {
    return await fetch.post<IAuthOutput>("/auth?status=200", input);
  } catch (error) {
    if (isAxiosError(error)) {
      return RequestService.buildError(error);
    }

    return GENERIC_ERROR;
  }
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
