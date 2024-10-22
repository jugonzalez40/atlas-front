import { WDataTable } from "@/domains/common/data-table/ui/wrappers/WDataTable";
import { projectColumns, IProject } from "@/domains/projects/data/project-columns";

interface IWProjectTablesProps {
  projects: IProject[];
}

export const WProjectsTable = ({ projects }: IWProjectTablesProps) => {
  return <WDataTable columns={projectColumns} data={projects} />;
};
