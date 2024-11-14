import {
  IActionsConfig,
  WDataTable,
} from "@/domains/shared/data-table/ui/wrappers/WDataTable";
import { requestColumns } from "@/domains/requests/data/request-columns";
import { deleteRequest } from "../../core/use-cases/deleteRequest.server";
import { IRequest } from "./WRequestForm";

import { RequestItem } from "../components/RequestItem";
import { IWRequestFilters } from "./WRequestsFilter";
import { useRequestStore } from "../../core/hooks/useRequestStore";
import { useShallow } from "zustand/shallow";

export interface IWRequestView {
  requests: IRequest[];
  filters: IWRequestFilters;
}

export const WRequestsList = () => {
  const requests = useRequestStore(useShallow((state) => state.requests));

  return (
    <div>
      {(requests || []).map((request) => (
        <RequestItem key={request.id} {...request} />
      ))}
    </div>
  );
};
