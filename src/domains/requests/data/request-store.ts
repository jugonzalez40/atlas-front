/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore } from "zustand/vanilla";
import { IRequest } from "../ui/wrappers/WRequestForm";
import { IRequestFilter } from "../ui/wrappers/WRequestsFilter";
import { deepMerge } from "@/lib/utils";
import { applyFilters } from "../core/use-cases/applyFilters";

export type TRequestState = {
  requests: IRequest[];
  initialRequests: IRequest[];
  filters: Partial<IRequestFilter>;
};

export type TRequestActions = {
  setRequests: (requests: IRequest[]) => void;
  setInitialRequests: (requests: IRequest[]) => void;
  setFilters: (_filters: Partial<IRequestFilter>) => void;
};

export type TRequestStore = TRequestState & TRequestActions;
export const defaultInitState: TRequestState = {
  requests: [],
  initialRequests: [],
  filters: {} as Partial<IRequestFilter>,
};

export const createRequestStore = (
  initState: TRequestState = defaultInitState
) => {
  return createStore<TRequestStore>()((set, get) => ({
    ...initState,
    setRequests: (requests) => set({ requests }),
    setInitialRequests: (requests) => set({ requests }),
    setFilters: (_filters: Partial<IRequestFilter>) => {
      const { filters, requests } = get();
      const newFilters = deepMerge(filters, _filters);
      const newRequests = [...applyFilters(newFilters, requests)];
      set({
        filters: newFilters,
        requests: newRequests,
      });
    },
  }));
};
