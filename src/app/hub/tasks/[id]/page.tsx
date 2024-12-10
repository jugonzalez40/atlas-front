import { PageTitle } from "@/components/ui/page-title";
import { ITask } from "@/domains/requests/ui/wrappers/WTaskForm";
import { getTask } from "@/domains/tasks/core/use-cases/getTask";
import WTaskForm from "@/domains/tasks/ui/wrappers/WTaskForm";

interface IEditTaskPageProps {
  params: {
    id: string;
  };
}

export default async function EditTaskPage({ params }: IEditTaskPageProps) {
  const task = (await getTask(params)).data || ({} as ITask);

  if (!task) return;

  return (
    <div className="mt-6">
      <PageTitle>Control diario</PageTitle>
      <WTaskForm task={task} />
    </div>
  );
}
