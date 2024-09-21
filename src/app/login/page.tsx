import React from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import logo from "../../../public/atlas.png";
import heroBack from "../../../public/back.webp";
import dynamic from "next/dynamic";
import { LoginFormSkeleton } from "@/domains/login/ui/components/LoginFormSkeleton";

const WLoginForm = dynamic(
  () => import("@/domains/login/ui/wrappers/WLoginForm"),
  { loading: () => <LoginFormSkeleton />, ssr: false }
);

export default function Login() {
  return (
    <div className="flex h-screen">
      <div className="w-0 flex-auto lg:w-full  bg-cover ">
        <Image
          alt="Hero background"
          src={heroBack}
          width={0}
          height={0}
          className="w-full h-full"
        />
      </div>
      <div
        className="w-full lg:w-[600px] content-center p-2 md:p-20 lg:p-3 animate-in fade-in
			  duration-1000 ease-in-out "
      >
        <CardHeader className="items-center">
          <Image
            alt="Atlas logo"
            src={logo}
            width={170}
            height={170}
            className="mb-12"
          />
        </CardHeader>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Ingrese correo y contraseña.</CardDescription>
        </CardHeader>
        <CardContent>
          <WLoginForm />
          {/* </Suspense> */}
        </CardContent>

        <div></div>
      </div>
    </div>
  );
}
