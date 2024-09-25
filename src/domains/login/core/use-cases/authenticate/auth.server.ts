/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { RequestService } from "@/services/RequestService";

export async function authenticate(...args: any[]) {
  console.log(args);
  const fetch = RequestService.getInstance();

  try {
    const result = await fetch.post("/auth", {
      user: "juan",
      pass: "123",
    });
    console.log(result);
    return { data: { status: 200, token: "123-jwt" } };
  } catch (error) {
    console.log(error);
    return { data: { status: 200, token: "123-jwt" } };
  }
}
