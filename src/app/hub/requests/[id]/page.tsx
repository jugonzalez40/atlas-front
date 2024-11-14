import { PageTitle } from "@/components/ui/page-title";
import { getRequest } from "@/domains/requests/core/use-cases/getRequest";
import WRequestForm, { IRequest } from "@/domains/requests/ui/wrappers/WRequestForm";

interface IEditRequestPageProps {
  params: {
    id: string;
  };
}

export default async function EditRequestPage({ params }: IEditRequestPageProps) {
  const request = (await getRequest(params)).data || ({} as IRequest);

  return (
    <div className="mt-6">
      <PageTitle>Editar requeste</PageTitle>
      <WRequestForm request={request} />
    </div>
  );
}
