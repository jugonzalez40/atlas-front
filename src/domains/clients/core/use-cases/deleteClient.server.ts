"use server";

import { IClient } from "@/domains/clients/data/client-columns";
import { RequestService } from "@/services/RequestService";
import { revalidatePath } from "next/cache";

export interface IClientInput extends IClient {}

export async function deleteClient(input: IClientInput) {
  const result = await RequestService.fetch<void>(`/clients/${input.id}`, {
    method: "DELETE",
  });

  revalidatePath("/clients");

  return result;
}
