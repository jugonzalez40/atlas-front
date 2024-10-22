import { useFormStore } from "@/domains/common/form/core/hooks/useFormStore";
import { useToast } from "@/hooks/use-toast";

import { useShallow } from "zustand/shallow";

export interface IGenericOutput<DataOutput> {
  status: number;
  error?: string;
  data?: DataOutput;
}

interface IUseFetchProps<I, O> {
  action: (args: I) => Promise<IGenericOutput<O>>;
  onError?: (result: IGenericOutput<O>) => void;
  onSuccess?: (result: O) => void;
}

export const useFetch = <ServerInput, ServerOutput>({
  action,
  onError,
  onSuccess,
}: IUseFetchProps<ServerInput, ServerOutput>) => {
  const { toast } = useToast();

  const { setIsFetching } = useFormStore(
    useShallow((state) => ({
      setIsFetching: state.setIsFetching,
    }))
  );

  const onErrorHandler = (result: IGenericOutput<ServerOutput>) => {
    toast({
      variant: "destructive",
      description: "Hubo un problema intentando conectar con el servidor ",
    });

    if (!onError) return;
    onError(result);
  };

  const onSuccessHandler = (result: IGenericOutput<ServerOutput>) => {
    // show toast, congrats
    if (!onSuccess) return;
    onSuccess(result.data as ServerOutput);
  };

  const execute = async (input: ServerInput) => {
    setIsFetching(true);
    try {
      const result = await action(input);
      if (!result) return;
      if (result.status >= 400) {
        onErrorHandler(result);
      } else {
        onSuccessHandler(result);
      }
    } catch (error) {
      onErrorHandler({ error: error as string, status: 500 });
    } finally {
      setIsFetching(false);
    }
  };

  return { execute };
};
