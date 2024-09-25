interface IGenericResponse {
  status: number;
}

interface IGenericError {
  error: string;
}

interface IUseServerActionsProps<T> {
  action: () => Promise<T>;
  onError?: (result: IGenericError) => void;
  onSuccess?: (result: T) => void;
}

export const useServerAction = <T extends IGenericResponse>({
  action,
  onError,
  onSuccess,
}: IUseServerActionsProps<T>) => {
  const onErrorHandler = (error: IGenericError) => {
    // show toast, error

    if (!onError) return;
    onError(error);
  };

  const onSuccessHandler = (result: T) => {
    // show toast, congrats
    if (!onSuccess) return;
    onSuccess(result);
  };

  const execute = async () => {
    // start is fetching
    try {
      const result = await action();

      if (result.status >= 400) {
        onErrorHandler(result as unknown as IGenericError);
      } else {
        onSuccessHandler(result);
      }
    } catch (error) {
      onErrorHandler(error as IGenericError);
    } finally {
      // stop is fetching
    }
  };

  return { execute };
};
