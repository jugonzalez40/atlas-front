"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WForm } from "../../../shared/form/ui/wrappers/WForm";
import { WInput } from "../../../shared/form/ui/wrappers/WInput";
import { WSubmit } from "../../../shared/form/ui/wrappers/WSubmit";

import { useFormManager } from "@/domains/shared/form/core/hooks/useFormManager";
import { addRequest } from "../../core/use-cases/addRequest.server";
import { Save } from "lucide-react";
import { editRequest } from "../../core/use-cases/editRequest.server";
import { useCrudHandler } from "../../../../hooks/useCrudHandler";
import {
  IProject,
  projectSchema,
} from "@/domains/projects/ui/wrappers/WProjectForm";
import {
  IMachineClass,
  machineClassSchema,
} from "@/domains/machines/data/machine-entities";
import { WSelect } from "@/domains/shared/form/ui/wrappers/WSelect";

export interface IRequestsOutput {
  requests: IRequest[];
}
export const requestStatusSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});

export const requestFormSchema = z.object({
  id: z.number().optional(),
  date: z.string().datetime({ local: true }).nullable(),
  status: requestStatusSchema,
  project: projectSchema,
  machineClass: machineClassSchema,
});

const defaultRequestValues = {
  date: null,
  status: {},
  project: {},
  machineClass: {},
};

export type IRequest = z.infer<typeof requestFormSchema>;
export type IRequestStatus = z.infer<typeof requestStatusSchema>;

interface IWRequestFormProps {
  request?: IRequest;
  projects: IProject[];
  machineClasses: IMachineClass[];
}

export const WRequestForm = ({
  request,
  projects,
  machineClasses,
}: IWRequestFormProps) => {
  const { add, edit } = useCrudHandler<IRequest>({
    add: {
      action: addRequest,
      onSuccess: {
        message: "👍 Solicitud guardada satisfactoriamente",
      },
    },
    edit: {
      action: editRequest,
      onSuccess: {
        message: "👍 Solicitud modificada satisfactoriamente",
      },
    },
  });

  const form = useForm<IRequest>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: request || defaultRequestValues,
  });

  useFormManager(form);

  const onSubmitHandler = async (values: IRequest) => {
    if (request) edit(values);
    else add(values);
  };

  return (
    <WForm<IRequest> onSubmit={onSubmitHandler}>
      <div className="flex flex-col">
        <div className="flex-auto mb-5">
          <WSelect<IProject>
            name="project"
            label="Proyecto"
            keyValue="contractNumber"
            placeholder="Seleccione un proyecto"
            options={projects}
          />
        </div>
        <div className="flex-auto mb-5">
          <WSelect<IMachineClass>
            name="machineClass"
            label="Tipo de maquina"
            placeholder="Seleccione un tipo de maquina"
            options={machineClasses}
          />
        </div>
        <WSubmit text="Guardar" className="w-fit" icon={<Save size={15} />} />
      </div>
    </WForm>
  );
};

export default WRequestForm;
