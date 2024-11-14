"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IRequest } from "../ui/wrappers/WRequestForm";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const requestColumns: ColumnDef<IRequest>[] = [
  {
    accessorKey: "nit",
    header: "NIT",
  },
  {
    accessorKey: "name",
    header: "Requeste empresa",
  },
];
