import * as React from "react"
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import logo from "../../../public/atlas.png";
import load from "../../../public/load.webp";
import { LoginForm } from "@/domains/login/LoginForm"

export default function Login() {


	return (
		<div className="flex h-screen">
			<div className="w-0 flex-auto lg:w-full bg-hero-pattern bg-cover " >
				<div className="w-full h-full bg-gradient-to-r from-black/60 to-white/5" />
			</div>
			<div className="w-full lg:w-[600px] content-center p-2 md:p-20 lg:p-3 animate-in fade-in
			  duration-1000 ease-in-out ">

				<CardHeader className="items-center">
					<Image alt="Atlas logo" src={logo} width={170} height={170} className="mb-12" />
				</CardHeader>
				<CardHeader>
					<CardTitle >Login</CardTitle>
					<CardDescription>Ingrese correo y contraseña.</CardDescription>
				</CardHeader>
				<CardContent>
					<LoginForm />
				</CardContent>

				<Image alt="Atlas logo" src={load} width={70} height={70} className="fixed bottom-0 right-0 xd" />

				<div>
				</div>
			</div>
		</div>
	);
}
