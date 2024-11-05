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
      message: "Cliente eliminado satisfactoriamente",
    },
  },
  editLink: "/hub/client/:id",
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
