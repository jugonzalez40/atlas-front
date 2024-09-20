"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { AbstractForm } from "../abstract/components/AbstractForm";
import { AbstractInput } from "../abstract/components/AbstractInput";
import { SubmitButton } from "../abstract/components/SubmitButton";
import { useState } from "react";

const formSchema = z.object({
	email: z.string().min(1, "requerido").email({
		message: "Esto no es un email"
	}),
	password: z.string().min(1, "requerido")
});

export type TFormData = z.infer<typeof formSchema>;

export const LoginForm = () => {

	const form = useForm<TFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: ""
		},

	});

	const [isLoading, setIsLoading] = useState(false);

	// 2. Define a submit handler.
	const onSubmit = (values: TFormData) => {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values)
		setIsLoading(true);
	}


	return <AbstractForm<TFormData> form={form} onSubmit={onSubmit} >
		<div className="flex flex-col">
			<div className="flex-auto"><AbstractInput control={form.control} name="email" label="Correo" placeholder="juan@ciam.com" /></div>
			<div className="flex-auto"><AbstractInput control={form.control} name="password" label="Contraseña" /></div>

			<SubmitButton text="Ingresar" isLoading={isLoading} />
		</div>

	</AbstractForm>


}
