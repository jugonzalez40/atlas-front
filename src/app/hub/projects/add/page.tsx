import { PageTitle } from "@/components/ui/page-title";
import WProjectForm from "@/domains/projects/ui/wrappers/WProjectForm";

export default function AddProjectPage() {
  return (
    <div className="mt-6">
      <PageTitle>Nuevo projecte</PageTitle>
      <WProjectForm />
    </div>
  );
}
