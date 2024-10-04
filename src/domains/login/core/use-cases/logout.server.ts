"use server";

import { AuthService } from "@/services/AuthService";
import { ConfigService } from "@/services/ConfigService";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () => {
  const config = ConfigService.getInstance();
  cookies().delete(config.accessTokenKey || "");
  AuthService.setAuthTokenHeader(null);
  redirect("/login");
};
