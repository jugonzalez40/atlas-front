import { RequestService } from "@/services/RequestService";

interface ICheckSessionResult {
  isValid: boolean;
}

export const checkSession = async (token: string) => {
  const fetch = RequestService.getInstance();

  return fetch
    .get<ICheckSessionResult>("/check_auth", { params: { token } })
    .catch(RequestService.buildError);
};
