"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WForm } from "../../../common/form/ui/wrappers/WForm";
import { WInput } from "../../../common/form/ui/wrappers/WInput";
import { WSubmit } from "../../../common/form/ui/wrappers/WSubmit";

import { useFetch } from "@/hooks/useFetch";
import { useFormManager } from "@/domains/common/form/core/hooks/useFormManager";
import { IProject } from "@/domains/projects/data/project-columns";
import { addProject } from "../../core/use-cases/addProject.server";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";
import { Save } from "lucide-react";
import { editProject } from "../../core/use-cases/editProject.server";
import { formSchema as clientFormSchema } from "@/domains/clients/ui/wrappers/WClientForm";
import { WTextarea } from "@/domains/common/form/ui/wrappers/WTextarea";
import { WDate } from "@/domains/common/form/ui/wrappers/WDate";
import { Wselect } from "@/domains/common/form/ui/wrappers/WSelect";

export interface IProjectsOutput {
  projects: IProject[];
}

export const formSchema = z.object({
  contractNumber: z.string().min(1, "requerido"),
  goal: z.string().min(1, "requerido"),
  startDate: z.string().datetime().min(1, "requerido"),
  endDate: z.string().datetime().min(1, "requerido"),
  client: clientFormSchema,
});

export type TFormData = z.infer<typeof formSchema>;

interface IWProjectFormProps {
  project?: IProject;
}

export const WProjectForm = ({ project }: IWProjectFormProps) => {
  const { toast } = useToast();
  const onErrorHandler = () => {
    toast({
      variant: "destructive",
      description: "👎 No fue posible guardar, vuelva a intentar más tarde.",
    });
  };

  const onSuccessHandler = () => {
    toast({
      variant: "success",
      description: "👍 Projecte registrado satisfactoriamente",
    });

    setTimeout(() => redirect("/hub/projects"), 2000);
  };

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

  const { execute } = useFetch<TFormData, void>({
    action: Boolean(project)
      ? (input) => editProject({ ...(project as IProject), ...input })
      : addProject,
    onError: onErrorHandler,
    onSuccess: onSuccessHandler,
  });

  const onSubmitHandler = async (values: TFormData) => {
    execute(values);
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
          <WTextarea name="goal" label="Objectivo" placeholder="123" />
        </div>
        <div className="flex-auto mb-5">
          <WDate name="startDate" label="Fecha inicio" />
        </div>

        <div className="flex-auto mb-5">
          <WDate name="endDate" label="Fecha fin" />
        </div>

        <div className="flex-auto mb-5">
          <Wselect
            name="client"
            label="Clientes"
            placeholder="Seleccione un cliente"
          />
        </div>

        <WSubmit text="Guardar" className="w-fit" icon={<Save size={15} />} />
      </div>
    </WForm>
  );
};

export default WProjectForm;
