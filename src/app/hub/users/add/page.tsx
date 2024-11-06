import { PageTitle } from "@/components/ui/page-title";
import WUserForm from "@/domains/users/ui/wrappers/WUserForm";

export default function AddUserPage() {
  return (
    <div className="mt-6">
      <PageTitle>Nuevo usuario</PageTitle>
      <WUserForm />
    </div>
  );
}
