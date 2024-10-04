"use server";

import { AuthService } from "@/services/AuthService";
import {
  GENERIC_ERROR,
  IGenericRequestError,
  RequestService,
} from "@/services/RequestService";
import { AxiosResponse } from "axios";

export interface IAuthInput {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  permissions: string[];
}

export interface IAuthOutput {
  accessToken: string;
  user: IUser;
}

type AuthAxiosResponse = AxiosResponse<IAuthOutput>;

const fetchAuth = async (
  input: IAuthInput
): Promise<AuthAxiosResponse | IGenericRequestError> => {
  const fetch = RequestService.getInstance();

  // return await fetch.post<IAuthOutput>("/auth?status=401", input);
  return await fetch
    .post<IAuthOutput>("/auth?status=200", input)
    .catch(RequestService.buildError);
};

export async function authenticate(
  input: IAuthInput
): Promise<IAuthOutput | IGenericRequestError> {
  const result = await fetchAuth(input);

  if ("data" in result) {
    const { data } = result;
    if (!data.accessToken) return GENERIC_ERROR;

    AuthService.login(data);
    return data;
  }

  return result;
}
