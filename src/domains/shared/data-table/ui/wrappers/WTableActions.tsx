import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CellContext } from "@tanstack/react-table";
import { FilePenLine, MoreHorizontal, X } from "lucide-react";
import Link from "next/link";
import { IActionsConfig } from "./WDataTable";
import { useCrudHandler } from "@/hooks/useCrudHandler";

export interface IWTableActionsProps<TData>
  extends CellContext<TData, unknown> {
  actionsConfig: IActionsConfig<TData>;
}

export const WTableActions = <TData,>({
  row,
  actionsConfig,
}: IWTableActionsProps<TData>) => {
  const { delete: _delete } = useCrudHandler<TData>({
    delete: actionsConfig.delete,
  });

  const buildHref = (rowData: TData) => {
    return actionsConfig.editLink.replace(
      /:(\w+)/g,
      (_, key) => rowData[key] || `:${key}`
    );
  };

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
          <Link className="inline-flex" href={buildHref(row.original)}>
            <FilePenLine />
            <p className="ml-4">Editar</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => _delete(row.original)}>
          <X />
          <p className="ml-2">Eliminar</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
