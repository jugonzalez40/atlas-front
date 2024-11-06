"use server";


import { RequestService } from "@/services/RequestService";
import { revalidatePath } from "next/cache";
import { IUser } from "../../ui/wrappers/WUserForm";

export interface IUserInput extends IUser {}

export async function editUser(input: IUserInput) {
  const result = await RequestService.fetch<void>(`/users/${input.id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });

  revalidatePath("/users");

  return result;
}
