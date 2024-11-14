"use server";

import { RequestService } from "@/services/RequestService";
import { IWRequestView } from "../../ui/wrappers/WRequestsList";

export async function getRequestsView() {
  const result = await RequestService.fetch<IWRequestView>(
    "/requests/view?status=200",
    {
      method: "GET",
    }
  );

  return result;
}
