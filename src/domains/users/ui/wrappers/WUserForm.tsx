"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WForm } from "../../../shared/form/ui/wrappers/WForm";
import { WInput } from "../../../shared/form/ui/wrappers/WInput";
import { WSubmit } from "../../../shared/form/ui/wrappers/WSubmit";

import { useFormManager } from "@/domains/shared/form/core/hooks/useFormManager";
import { addUser } from "../../core/use-cases/addUser.server";
import { Save } from "lucide-react";
import { editUser } from "../../core/use-cases/editUser.server";
import { useCrudHandler } from "../../../../hooks/useCrudHandler";

export interface IUsersOutput {
  users: IUser[];
}

export const formSchema = z.object({
  nit: z.string().min(1, "requerido"),
  name: z.string().min(1, "requerido"),
  id: z.number().optional(),
});

export type IUser = z.infer<typeof formSchema>;

interface IWUserFormProps {
  user?: IUser;
}

export const WUserForm = ({ user }: IWUserFormProps) => {
  const { add, edit } = useCrudHandler<IUser>({
    add: {
      action: addUser,
      onSuccess: {
        message: "👍 Usere guardado satisfactoriamente",
      },
    },
    edit: {
      action: editUser,
      onSuccess: {
        message: "👍 Usere modificado satisfactoriamente",
      },
    },
  });

  const form = useForm<IUser>({
    resolver: zodResolver(formSchema),
    defaultValues: user || {
      nit: "",
      name: "",
    },
  });

  useFormManager(form);


  const onSubmitHandler = async (values: IUser) => {
    if (user) edit(values);
    else add(values);
  };

  return (
    <WForm<IUser> onSubmit={onSubmitHandler}>
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

export default WUserForm;
