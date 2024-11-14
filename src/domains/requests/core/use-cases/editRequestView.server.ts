"use server";

import { RequestService } from "@/services/RequestService";
import { IRequest } from "../../ui/wrappers/WRequestForm";


export interface IGetRequestInput {
  id: string;
}

export interface IGetRequestOuput extends IRequest {}

export async function getRequestAddView() {
  const result = await RequestService.fetch<IGetRequestOuput>(
    `/requests/edit-view`,
    {
      method: "GET",
    }
  );

  return result;
}
