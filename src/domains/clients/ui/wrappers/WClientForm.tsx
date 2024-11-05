"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WForm } from "../../../shared/form/ui/wrappers/WForm";
import { WInput } from "../../../shared/form/ui/wrappers/WInput";
import { WSubmit } from "../../../shared/form/ui/wrappers/WSubmit";

import { useFormManager } from "@/domains/shared/form/core/hooks/useFormManager";
import { IClient } from "@/domains/clients/data/client-columns";
import { addClient } from "../../core/use-cases/addClient.server";
import { Save } from "lucide-react";
import { editClient } from "../../core/use-cases/editClient.server";
import { useCrudHandler } from "../../../../hooks/useCrudHandler";

export interface IClientsOutput {
  clients: IClient[];
}

export const formSchema = z.object({
  nit: z.string().min(1, "requerido"),
  name: z.string().min(1, "requerido"),
  id: z.number().optional(),
});

export type TFormData = z.infer<typeof formSchema>;

interface IWClientFormProps {
  client?: IClient;
}

export const WClientForm = ({ client }: IWClientFormProps) => {
  const { add, edit } = useCrudHandler<TFormData>({
    add: {
      action: addClient,
      onSuccess: {
        message: "👍 Cliente guardado satisfactoriamente",
      },
    },
    edit: {
      action: editClient,
      onSuccess: {
        message: "👍 Cliente modificado satisfactoriamente",
      },
    },
  });

  const form = useForm<TFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: client || {
      nit: "",
      name: "",
    },
  });

  useFormManager(form);


  const onSubmitHandler = async (values: TFormData) => {
    if (client) edit(values);
    else add(values);
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
