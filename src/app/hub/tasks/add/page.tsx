import { PageTitle } from "@/components/ui/page-title";
import WTaskForm from "@/domains/tasks/ui/wrappers/WTaskForm";

export default function AddTaskPage() {
  return (
    <div className="mt-6">
      <PageTitle>Nuevo taske</PageTitle>
      <WTaskForm />
    </div>
  );
}
