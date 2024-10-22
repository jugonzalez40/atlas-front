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
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/dist/server/api-utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface IClient {
  nit: string;
  id?: string;
  name: string;
}

export const clientColumns: ColumnDef<IClient>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nit",
    header: "NIT",
  },
  {
    accessorKey: "name",
    header: "Cliente empresa",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { toast } = useToast();
      const onErrorHandler = () => {
        toast({
          variant: "destructive",
          description:
            "👎 No fue posible eliminar, vuelva a intentar más tarde.",
        });
      };

      const onSuccessHandler = () => {
        toast({
          variant: "success",
          description: "👍 Cliente eliminado satisfactoriamente",
        });

        // setTimeout(() => redirect("/hub/clients"), 2000);
      };
      const { execute } = useFetch<TFormData, void>({
        action: deleteClient,
        onError: onErrorHandler,
        onSuccess: onSuccessHandler,
      });
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link
                className="inline-flex"
                href={`/hub/clients/${row.original.id}`}
              >
                <FilePenLine />
                <p className="ml-4">Editar</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => execute(row.original)}>
              <X />
              <p className="ml-2">Eliminar</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
