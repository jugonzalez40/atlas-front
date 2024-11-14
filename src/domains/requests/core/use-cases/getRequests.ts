"use server";


import { RequestService } from "@/services/RequestService";
import { IRequest } from "../../ui/wrappers/WRequestForm";

export async function getRequests() {
  const result = await RequestService.fetch<IRequest[]>("/requests?status=200", {
    method: "GET",
  });

  return result;
}
