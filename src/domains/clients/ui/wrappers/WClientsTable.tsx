import {
  IActionsConfig,
  WDataTable,
} from "@/domains/shared/data-table/ui/wrappers/WDataTable";
import { clientColumns, IClient } from "@/domains/clients/data/client-columns";
import { deleteClient } from "../../core/use-cases/deleteClient.server";

interface IWClientTablesProps {
  clients: IClient[];
}
const actionsConfig: IActionsConfig<IClient> = {
  delete: {
    action: deleteClient,
    onSuccess: {
      message: "Proyecto eliminado satisfactoriamente",
    },
  },
  editLink: "/hub/projects/:id",
};

export const WClientsTable = ({ clients }: IWClientTablesProps) => {
  return (
    <WDataTable
      columns={clientColumns}
      data={clients}
      actionsConfig={actionsConfig}
    />
  );
};
