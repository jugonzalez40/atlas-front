"use server";

import { IFetchResponse, RequestService } from "@/services/RequestService";
import { IWRequestView } from "../../ui/wrappers/WRequestsList";
const mock = {
  status: 200,
  data: {
    requests: [
      {
        id: 1,
        date: "2024-11-12T10:00:00", // Example ISO 8601 datetime
        status: { id: "1", name: "Pending", color: "yellow" },
        project: {
          id: 101,
          contractNumber: "CN001",
          goal: "Build a new factory",
          startDate: "2024-01-01T00:00:00",
          endDate: "2024-12-31T23:59:59",
        },
        machineClass: { id: 1, name: "Heavy Machinery" },
      },
      {
        id: 2,
        date: "2024-11-10T15:30:00",
        status: { id: "2", name: "Approved", color: "green" },
        project: {
          id: 102,
          contractNumber: "CN002",
          goal: "Renovate office building",
          startDate: "2024-03-01T00:00:00",
          endDate: "2024-10-30T23:59:59",
        },
        machineClass: { id: 2, name: "Light Equipment" },
      },
      {
        id: 3,
        date: "2024-11-05T09:00:00",
        status: { id: "3", name: "Rejected", color: "red" },
        project: {
          id: 103,
          contractNumber: "CN003",
          goal: "Expand production line",
          startDate: "2024-05-01T00:00:00",
          endDate: "2024-09-15T23:59:59",
        },
        machineClass: { id: 3, name: "Specialized Equipment" },
      },
      {
        id: 4,
        date: "2024-11-08T11:45:00",
        status: { id: "1", name: "Pending", color: "yellow" },
        project: {
          id: 104,
          contractNumber: "CN004",
          goal: "Construct warehouse",
          startDate: "2024-02-01T00:00:00",
          endDate: "2024-11-30T23:59:59",
        },
        machineClass: { id: 4, name: "Warehouse Equipment" },
      },
      {
        id: 5,
        date: "2024-11-01T14:20:00",
        status: { id: "2", name: "Approved", color: "green" },
        project: {
          id: 105,
          contractNumber: "CN005",
          goal: "Develop new logistics hub",
          startDate: "2024-04-15T00:00:00",
          endDate: "2024-12-15T23:59:59",
        },
        machineClass: { id: 5, name: "Logistics Equipment" },
      },
    ],
    filters: {
      statuses: [
        { id: "1", name: "Pending", color: "yellow" },
        { id: "2", name: "Approved", color: "green" },
        { id: "3", name: "Rejected", color: "red" },
      ],
      projects: [
        {
          id: 101,
          contractNumber: "CN001",
          goal: "Build a new factory",
          startDate: "2024-01-01T00:00:00",
          endDate: "2024-12-31T23:59:59",
        },
        {
          id: 102,
          contractNumber: "CN002",
          goal: "Renovate office building",
          startDate: "2024-03-01T00:00:00",
          endDate: "2024-10-30T23:59:59",
        },
        {
          id: 103,
          contractNumber: "CN003",
          goal: "Expand production line",
          startDate: "2024-05-01T00:00:00",
          endDate: "2024-09-15T23:59:59",
        },
      ],
      machineClasses: [
        { id: 1, name: "Heavy Machinery" },
        { id: 2, name: "Light Equipment" },
        { id: 3, name: "Specialized Equipment" },
        { id: 4, name: "Warehouse Equipment" },
        { id: 5, name: "Logistics Equipment" },
      ],
    },
  },
};

export async function getRequestsView(): Promise<
  IFetchResponse<IWRequestView>
> {
  const result = await RequestService.fetch<IWRequestView>(
    "/requests/view?status=200",
    {
      method: "GET",
    }
  );

  return result;
  // return mock as unknown as IFetchResponse<IWRequestView>;
}
