"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WForm } from "../../../common/form/ui/wrappers/WForm";
import { WInput } from "../../../common/form/ui/wrappers/WInput";
import { WSubmit } from "../../../common/form/ui/wrappers/WSubmit";

import { useFetch } from "@/hooks/useFetch";
import { useFormManager } from "@/domains/common/form/core/hooks/useFormManager";
import { IClient } from "@/domains/clients/data/client-columns";
import { addClient } from "../../core/use-cases/addClient.server";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";
import { Save } from "lucide-react";
import { editClient } from "../../core/use-cases/editClient.server";

export interface IClientsOutput {
  clients: IClient[];
}

export const formSchema = z.object({
  nit: z.string().min(1, "requerido"),
  name: z.string().min(1, "requerido"),
});

export type TFormData = z.infer<typeof formSchema>;

interface IWClientFormProps {
  client?: IClient;
}

export const WClientForm = ({ client }: IWClientFormProps) => {
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
      description: "👍 Cliente guardado satisfactoriamente",
    });

    setTimeout(() => redirect("/hub/clients"), 2000);
  };

  const form = useForm<TFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: client || {
      nit: "",
      name: "",
    },
  });

  useFormManager(form);

  const { execute } = useFetch<TFormData, void>({
    action: Boolean(client)
      ? (input) => editClient({ ...(client as IClient), ...input })
      : addClient,
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

export default WClientForm;
