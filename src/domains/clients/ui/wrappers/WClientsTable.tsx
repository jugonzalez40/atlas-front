import { WDataTable } from "@/domains/common/data-table/ui/wrappers/WDataTable";
import { clientColumns, IClient } from "@/domains/clients/data/client-columns";

interface IWClientTablesProps {
  clients: IClient[];
}

export const WClientsTable = ({ clients }: IWClientTablesProps) => {
  return <WDataTable columns={clientColumns} data={clients} />;
};
