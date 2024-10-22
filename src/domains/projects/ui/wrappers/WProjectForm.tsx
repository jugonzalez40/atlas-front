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

export interface IProjectsOutput {
  projects: IProject[];
}

const formSchema = z.object({
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
          <WInput name="nit" label="NIT" placeholder="1234567-8" />
        </div>
        <div className="flex-auto mb-5">
          <WInput name="name" label="Nombre" />
        </div>
        <WSubmit text="Guardar" className="w-fit" icon={<Save size={15} />} />
      </div>
    </WForm>
  );
};

export default WProjectForm;
