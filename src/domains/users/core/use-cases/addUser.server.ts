"use server";

// import { IUser } from "@/domains/users/data/user-columns";
import { RequestService } from "@/services/RequestService";
import { revalidatePath } from "next/cache";
import { IUser } from "../../ui/wrappers/WUserForm";

export interface IUserInput extends Omit<IUser, "id"> {}

export async function addUser(input: IUserInput) {
  const result = await RequestService.fetch<void>("/users?status=200", {
    method: "POST",
    body: JSON.stringify(input),
    next: {
      tags: ["users"],
    },
  });

  revalidatePath("/users");

  return result;
}
