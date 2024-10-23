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

import { useToast } from "@/hooks/use-toast";
import { TFormData } from "../ui/wrappers/WProjectForm";
import { IClient } from "@/domains/clients/data/client-columns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface IProject {
  id?: string;
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
    accessorKey: "contractNumber",
    header: "Numero de contrato",
  },
  {
    accessorKey: "client",
    header: "Cliente",
    cell: ({ row }) => {
      const client = row.getValue("client") as IClient;
      return <div className="font-medium">{client.name}</div>;
    },
  },
  {
    accessorKey: "goal",
    header: "Objetivo",
  },
  {
    accessorKey: "startDate",
    header: "Fecha inicio",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {formatDate(row.getValue("startDate"))}
        </div>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: "Fecha final",
    cell: ({ row }) => {
      return (
        <div className="font-medium">{formatDate(row.getValue("endDate"))}</div>
      );
    },
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
          description: "👍 Projecte eliminado satisfactoriamente",
        });

        // setTimeout(() => redirect("/hub/projects"), 2000);
      };
      const { execute } = useFetch<TFormData, void>({
        action: deleteProject,
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
                href={`/hub/projects/${row.original.id}`}
              >
                <FilePenLine />
                <p className="ml-4">Editar</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => execute(row.original as IProject)}>
              <X />
              <p className="ml-2">Eliminar</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
