"use server";


import { RequestService } from "@/services/RequestService";
import { ITask } from "../../ui/wrappers/WTaskForm";

export async function getTasks() {
  const result = await RequestService.fetch<ITask[]>("/tasks?status=200", {
    method: "GET",
  });

  return result;
}