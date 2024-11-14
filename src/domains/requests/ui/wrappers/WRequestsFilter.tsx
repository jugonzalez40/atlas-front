import { IRequestStatus } from "./WRequestForm";
import { IProject } from "@/domains/projects/data/project-columns";
import { IMachineClass } from "@/domains/machines/data/machine-entities";
import { FilterSelect } from "../components/FilterSelect";
import { useRequestStore } from "../../core/hooks/useRequestStore";
import { useShallow } from "zustand/shallow";

export interface IWRequestFilters {
  statuses: IRequestStatus[];
  projects: IProject[];
  machineClasses: IMachineClass[];
}

export interface IRequestFilter {
  status: IRequestStatus;
  project: IProject;
  machineClass: IMachineClass;
}

export const WRequestsFilter = ({
  statuses,
  projects,
  machineClasses,
}: IWRequestFilters) => {
  const [setFilters] = useRequestStore(
    useShallow((state) => [state.setFilters])
  );

  const statusChangeHandler = (value?: IRequestStatus) =>
    setFilters({
      status: value,
    });

  const projectsChangeHandler = (value?: IProject) =>
    setFilters({
      project: value,
    });

  const machineClassChangeHandler = (value?: IMachineClass) =>
    setFilters({
      machineClass: value,
    });

  return (
    <div className="flex flex-row">
      <FilterSelect<IRequestStatus>
        placeholder="Estado"
        options={statuses}
        onChange={statusChangeHandler}
      />
      <FilterSelect<IProject>
        placeholder="Proyecto"
        options={projects}
        onChange={projectsChangeHandler}
      />
      <FilterSelect<IMachineClass>
        placeholder="Tipo de maquina"
        options={machineClasses}
        onChange={machineClassChangeHandler}
      />
    </div>
  );
};
