"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WForm } from "../../../core/form/components/WForm";
import { WInput } from "../../../core/form/components/WInput";
import { WSubmit } from "../../../core/form/components/WSubmit";
import { useToast } from "@/hooks/use-toast";
import { useFormManager } from "@/domains/core/form/hooks/useFormManager";
import {
  authenticate,
  IAuthInput,
  IAuthOutput,
} from "@/domains/login/core/use-cases/authenticate.server";

import { useInvalidCredentials } from "../../core/use-cases/invalidCredentials";
import { useFetch } from "@/hooks/useFetch";
// import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().min(1, "requerido").email({
    message: "Esto no es un email",
  }),
  password: z.string().min(1, "requerido"),
});

export type TFormData = z.infer<typeof formSchema>;

export const WLoginForm = () => {
  const form = useForm<TFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useFormManager(form);

  const { checkResponse } = useInvalidCredentials();
  const { execute } = useFetch<TFormData, IAuthOutput>({
    action: authenticate,
    onError: checkResponse,
  });

  const onSubmitHandler = async (values: TFormData) => {
    execute(values);
  };

  // const mon = async () => {
  //   const result = await fetch(
  //     "https://atlas-back-c3gghehzfufbdphu.canadacentral-01.azurewebsites.net/api/hello"
  //   );
  //   console.log(await result.text());
  // };

  // useEffect(() => {
  //   mon();
  // }, []);

  return (
    <WForm<TFormData> onSubmit={onSubmitHandler}>
      <div className="flex flex-col">
        <div className="flex-auto mb-5">
          <WInput name="email" label="Correo" placeholder="juan@ciam.com" />
        </div>
        <div className="flex-auto mb-5">
          <WInput type="password" name="password" label="Contraseña" />
        </div>
        <WSubmit text="Ingresar" />
      </div>
    </WForm>
  );
};

export default WLoginForm;
