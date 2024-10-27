"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WForm } from "../../../shared/form/ui/wrappers/WForm";
import { WInput } from "../../../shared/form/ui/wrappers/WInput";
import { WSubmit } from "../../../shared/form/ui/wrappers/WSubmit";

import { useFetch } from "@/hooks/useFetch";
import { useFormManager } from "@/domains/shared/form/core/hooks/useFormManager";
import { IProject } from "@/domains/projects/data/project-columns";
import { addProject } from "../../core/use-cases/addProject.server";
import { useToast } from "@/hooks/useToast";
import { redirect } from "next/navigation";
import { Save } from "lucide-react";
import { editProject } from "../../core/use-cases/editProject.server";
import { formSchema as clientFormSchema } from "@/domains/clients/ui/wrappers/WClientForm";
import { WTextarea } from "@/domains/shared/form/ui/wrappers/WTextarea";
import { WDate } from "@/domains/shared/form/ui/wrappers/WDate";
import { WSelect } from "@/domains/shared/form/ui/wrappers/WSelect";
import { IClient } from "@/domains/clients/data/client-columns";
import { useCrudHandler } from "@/hooks/useCrudHandler";

export interface IProjectsOutput {
  projects: IProject[];
}

export const formSchema = z.object({
  id: z.number().optional(),
  contractNumber: z.string().min(1, "requerido"),
  goal: z.string().min(1, "requerido"),
  startDate: z.string().datetime({ local: true }).min(1, "requerido"),
  endDate: z.string().datetime({ local: true }).min(1, "requerido"),
  client: clientFormSchema,
});

export type TFormData = z.infer<typeof formSchema>;

interface IWProjectFormProps {
  project?: IProject;
  clients: IClient[];
}

export const WProjectForm = ({ project, clients }: IWProjectFormProps) => {
  const { add, edit } = useCrudHandler<TFormData>({
    add: {
      action: addProject,
      onSuccess: {
        message: "👍 Projecto guardado satisfactoriamente",
      },
    },
    edit: {
      action: editProject,
      onSuccess: {
        message: "👍 Projecto modificado satisfactoriamente",
      },
    },
  });

  const form = useForm<TFormData>({
    resolver: zodResolver(formSchema),
    defaultValues:
      project ||
      ({
        contractNumber: "",
        goal: "",
        startDate: "",
        endDate: "",
        client: {},
      } as IProject),
  });

  useFormManager(form);

  const onSubmitHandler = async (values: TFormData) => {
    if (project) edit(values);
    else add(values);
  };

  return (
    <WForm<TFormData> onSubmit={onSubmitHandler}>
      <div className="flex flex-col">
        <div className="flex-auto mb-5">
          <WInput
            name="contractNumber"
            label="Numero de contrato"
            placeholder="123"
          />
        </div>
        <div className="flex-auto mb-5">
          <WTextarea name="goal" label="Objetivo" placeholder="Lorem.." />
        </div>
        <div className="flex-auto mb-5">
          <WDate name="startDate" label="Fecha inicio" />
        </div>

        <div className="flex-auto mb-5">
          <WDate name="endDate" label="Fecha fin" />
        </div>

        <div className="flex-auto mb-5">
          <WSelect<IClient>
            name="client"
            label="Clientes"
            placeholder="Seleccione un cliente"
            options={clients}
          />
        </div>

        <WSubmit text="Guardar" className="w-fit" icon={<Save size={15} />} />
      </div>
    </WForm>
  );
};

export default WProjectForm;
