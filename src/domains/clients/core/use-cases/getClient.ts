"use server";

import { IClient } from "@/domains/data/client-columns";
import { RequestService } from "@/services/RequestService";

export interface IGetClientInput {
  id: string;
}

export interface IGetClientOutput extends IClient {}

export async function getClient({ id }: IGetClientInput) {
  const result = await RequestService.fetch<IGetClientOutput>(`/clients/${id}`, {
    method: "GET",
  });

  return result;
}
