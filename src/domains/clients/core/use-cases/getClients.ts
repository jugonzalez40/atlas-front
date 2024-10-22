"use server";

import { IClient } from "@/domains/clients/data/client-columns";
import { RequestService } from "@/services/RequestService";

export async function getClients() {
  const result = await RequestService.fetch<IClient[]>("/clients?status=200", {
    method: "GET",
  });

  return result;
}
