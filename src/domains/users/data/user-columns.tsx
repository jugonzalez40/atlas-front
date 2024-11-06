"use client";


import { ColumnDef } from "@tanstack/react-table";

import { IUser } from "../ui/wrappers/WUserForm";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const userColumns: ColumnDef<IUser>[] = [

  {
    accessorKey: "nit",
    header: "NIT",
  },
  {
    accessorKey: "name",
    header: "Usere empresa",
  },
];
