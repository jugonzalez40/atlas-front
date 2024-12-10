"use server";


import { RequestService } from "@/services/RequestService";
import { revalidatePath } from "next/cache";
import { ITask } from "../../ui/wrappers/WTaskForm";

export interface ITaskInput extends ITask {}

export async function editTask(input: ITaskInput) {
  const result = await RequestService.fetch<void>(`/tasks/${input.id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });

  revalidatePath("/tasks");

  return result;
}
