import { PageTitle } from "@/components/ui/page-title";
import { getUser } from "@/domains/users/core/use-cases/getUser";
import WUserForm, { IUser } from "@/domains/users/ui/wrappers/WUserForm";

interface IEditUserPageProps {
  params: {
    id: string;
  };
}

export default async function EditUserPage({ params }: IEditUserPageProps) {
  const user = (await getUser(params)).data || ({} as IUser);

  return (
    <div className="mt-6">
      <PageTitle>Editar usuario</PageTitle>
      {/* <WUserForm user={user} /> */}
    </div>
  );
}
