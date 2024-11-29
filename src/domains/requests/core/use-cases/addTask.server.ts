"use server";


import { RequestService } from "@/services/RequestService";
import { revalidatePath } from "next/cache";
import { IRequest } from "../../ui/wrappers/WRequestForm";
import { ITask } from "../../ui/wrappers/WTaskForm";

export interface ITaskInput extends ITask {}

export async function addTask(input: ITaskInput) {
  const result = await RequestService.fetch<void>("/tasks?status=200", {
    method: "POST",
    body: JSON.stringify(input),
    next: {
      tags: ["tasks"],
    },
  });

  revalidatePath("/tasks");

  return result;
}
