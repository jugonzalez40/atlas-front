"use server";


import { RequestService } from "@/services/RequestService";
import { IRequest } from "../../ui/wrappers/WRequestForm";

export interface IGetRequestInput {
  id: string;
}

export interface IGetRequestOutput extends IRequest {}

export async function getRequest({ id }: IGetRequestInput) {
  const result = await RequestService.fetch<IRequest>(`/requests/${id}`, {
    method: "GET",
  });

  return result;
}
