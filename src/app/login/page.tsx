import * as React from "react"

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"



export default function Login() {
	return (
		<div className="flex h-screen">
			<div className="flex-auto w-screen bg-hero-pattern bg-cover " >

				<div className=" w-full h-full bg-gradient-to-r from-black/60 to-white/5" ></div>
			</div>
			<div className="flex-auto content-center">



				<Card className="w-[350px] m-10 border-none shadow-none">
					<CardHeader>
						<CardTitle>Login</CardTitle>
						<CardDescription>Ingrese correo y contraseña para ingresar.</CardDescription>
					</CardHeader>
					<CardContent>
						<form>
							<div className="grid w-full items-center gap-4">
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="name">Name</Label>
									<Input id="name" placeholder="Name of your project" />
								</div>
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="framework">Framework</Label>
									<Select>
										<SelectTrigger id="framework">
											<SelectValue placeholder="Select" />
										</SelectTrigger>
										<SelectContent position="popper">
											<SelectItem value="next">Next.js</SelectItem>
											<SelectItem value="sveltekit">SvelteKit</SelectItem>
											<SelectItem value="astro">Astro</SelectItem>
											<SelectItem value="nuxt">Nuxt.js</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</form>
					</CardContent>
					<CardFooter className="flex justify-between">
						<Button>Ingresar</Button>
					</CardFooter>
				</Card>

			</div>
		</div>
	);
}
