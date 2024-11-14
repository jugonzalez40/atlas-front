"use server";


import { RequestService } from "@/services/RequestService";
import { revalidatePath } from "next/cache";
import { IRequest } from "../../ui/wrappers/WRequestForm";

export interface IRequestInput extends IRequest {}

export async function editRequest(input: IRequestInput) {
  const result = await RequestService.fetch<void>(`/requests/${input.id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });

  revalidatePath("/requests");

  return result;
}
