"use client";

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
    <div className="h-[calc(100vh-280px)] overflow-y-scroll mb-6">
      {(requests || []).map((request) => (
        <RequestItem key={request.id} {...request} className="mb-6" />
      ))}
    </div>
  );
};
