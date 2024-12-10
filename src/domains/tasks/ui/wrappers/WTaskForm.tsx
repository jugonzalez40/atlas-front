"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WForm } from "../../../shared/form/ui/wrappers/WForm";
import { WInput } from "../../../shared/form/ui/wrappers/WInput";
import { WSubmit } from "../../../shared/form/ui/wrappers/WSubmit";

import { useFormManager } from "@/domains/shared/form/core/hooks/useFormManager";
import { addTask } from "../../core/use-cases/addTask.server";
import { Save } from "lucide-react";
import { editTask } from "../../core/use-cases/editTask.server";
import { useCrudHandler } from "../../../../hooks/useCrudHandler";
import { requestFormSchema } from "@/domains/requests/ui/wrappers/WRequestForm";
import { machineFormSchema } from "@/domains/machines/data/machine-entities";
import { ITask, taskSchema } from "@/domains/requests/ui/wrappers/WTaskForm";
import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { Separator } from "@/components/ui/separator";

export interface ITasksOutput {
  tasks: ITask[];
}

interface IWTaskFormProps {
  task?: ITask;
}

export const WTaskForm = ({ task }: IWTaskFormProps) => {
  const { add, edit } = useCrudHandler<ITask>({
    add: {
      action: addTask,
      onSuccess: {
        message: "👍 Asignación guardada satisfactoriamente",
      },
    },
    edit: {
      action: editTask,
      onSuccess: {
        message: "👍 Asignación modificada satisfactoriamente",
      },
    },
  });

  const form = useForm<ITask>({
    resolver: zodResolver(taskSchema),
    defaultValues: task || {
      nit: "",
      name: "",
    },
  });

  useFormManager(form);

  const onSubmitHandler = async (values: ITask) => {
    if (task) edit(values);
    else add(values);
  };
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-primary">
            Solicitud #{task?.request?.id}
          </span>
          {task?.operator && (
            <span className="text-sm">
              <b>Operario ➜ </b>
              {task?.operator.lastName + " "} {task?.operator.name}
            </span>
          )}

          {task?.costCenter && (
            <span className="text-sm">
              <b>Centro de costos ➜</b>
              {task.costCenter.name}
            </span>
          )}

          {task?.machinery && (
            <span className="text-sm">
              <b>Maquina ➜</b>
              {task.machinery.brand + " "} {task.machinery.registrationNumber}
            </span>
          )}

          <Separator className="my-2" />

          <p className="text-md font-semibold my-2"> Seleccione una fecha ↓</p>
          <Calendar
            // className="w-full"
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border w-fit"
          />
        </div>

        <div className="w-full p-2">
          <WForm<ITask> onSubmit={onSubmitHandler}>
            <div className="flex flex-col">
              <div className="flex-auto mb-5">
                <WInput name="nit" label="NIT" placeholder="1234567-8" />
              </div>
              <div className="flex-auto mb-5">
                <WInput name="name" label="Nombre" />
              </div>
              <WSubmit
                text="Guardar"
                className="w-fit"
                icon={<Save size={15} />}
              />
            </div>
          </WForm>
        </div>
      </div>
    </>
  );
};

export default WTaskForm;
