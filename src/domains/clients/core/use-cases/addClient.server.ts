"use server";

import { IClient } from "@/domains/data/client-columns";
import { RequestService } from "@/services/RequestService";

export interface IClientInput extends Omit<IClient, "id"> {}

export async function addClient(input: IClientInput) {
  const result = await RequestService.fetch<void>("/clients?status=200", {
    method: "POST",
    body: JSON.stringify(input),
  });
  const bad = result.status >= 400;

  // if (!bad) {
  //   redirect("/hub/clients");
  // }

  return result;
}
