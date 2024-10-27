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
import { deleteClient } from "../core/use-cases/deleteClient.server";
import { useFetch } from "@/hooks/useFetch";
import { TFormData } from "../ui/wrappers/WClientForm";
import { useToast } from "@/hooks/useToast";
import { redirect } from "next/dist/server/api-utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface IClient {
  nit: string;
  id?: number;
  name: string;
}

export const clientColumns: ColumnDef<IClient>[] = [

  {
    accessorKey: "nit",
    header: "NIT",
  },
  {
    accessorKey: "name",
    header: "Cliente empresa",
  },
];
