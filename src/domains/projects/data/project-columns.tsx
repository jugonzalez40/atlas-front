"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import { FilePenLine, MoreHorizontal, X } from "lucide-react";
import Link from "next/link";
import { deleteProject } from "../core/use-cases/deleteProject.server";
import { useFetch } from "@/hooks/useFetch";

import { useToast } from "@/hooks/useToast";
import { IProject } from "../ui/wrappers/WProjectForm";

import { buildEntityCell } from "@/domains/shared/data-table/core/use-cases/buildEntityCell";
import { IClient } from "@/domains/clients/ui/wrappers/WClientForm";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface IProject {
  id?: number;
  client: IClient;
  contractNumber: string;
  goal: string;
  startDate: string;
  endDate: string;
}

const formatDate = (date: string) => {
  // const formatted = new Date(date).toLocaleDateString();

  return <div className="text-right font-medium">{date}</div>;
};

export const projectColumns: ColumnDef<IProject>[] = [
  {
    accessorKey: "contractNumber",
    header: "Numero de contrato",
  },
  {
    accessorKey: "client",
    header: "Cliente",
    cell: (props) => buildEntityCell<IProject>("client", "name", props),
  },
  {
    accessorKey: "goal",
    header: "Objetivo",
  },
  {
    accessorKey: "startDate",
    header: "Fecha inicio",
  },
  {
    accessorKey: "endDate",
    header: "Fecha final",
  },
];
