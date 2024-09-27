import { useToast } from "@/hooks/use-toast";
import { IGenericOutput } from "@/hooks/useFetch";

export const useInvalidCredentials = () => {
  const { toast } = useToast();
  const checkResponse = (result: IGenericOutput) => {
    if (result.status !== 401) return;

    toast({
      variant: "warning",
      description: "Correo o contraseña invalidos",
    });
  };

  return { checkResponse };
};
