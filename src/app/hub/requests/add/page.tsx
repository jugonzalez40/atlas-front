import { PageTitle } from "@/components/ui/page-title";
import WRequestForm from "@/domains/requests/ui/wrappers/WRequestForm";

export default function AddRequestPage() {
  return (
    <div className="mt-6">
      <PageTitle>Nuevo requeste</PageTitle>
      <WRequestForm />
    </div>
  );
}
