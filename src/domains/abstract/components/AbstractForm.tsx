"use client";
import React from "react";

import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";


// const formSchema = z.object({
// 	email: z.string().min(1, "requerido").email({
// 		message: "Esto no es un email"
// 	}),
// 	password: z.string().min(1, "requerido")
// });

interface IAbstractFormProps<TValues extends FieldValues> {

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	form: UseFormReturn<TValues, any, undefined>;
	children: React.ReactNode
	onSubmit: (values: TValues) => void
}


// Recursive Replace Function
// const replaceChild = (children: ReactNode, control: Control<FieldValues>): ReactNode => {
// 	// If children is a single child, wrap it in an array for uniform processing
// 	if (!Array.isArray(children)) {
// 		children = [children];
// 	}


// 	return Children.map<ReactNode, ReactNode>(children, (child) => {
// 		if (!React.isValidElement(child)) return child;
// 		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// 		// @ts-ignore
// 		console.log(child.type.name);
// 		if (child.key?.startsWith("Abstract")) {
// 			// return child;
// 			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// 			// @ts-ignore
// 			return React.cloneElement(child, { control }) as ReactNode;
// 		}

// 		if (child?.props?.children) {
// 			// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 			return React.cloneElement(child as React.ReactElement<any>, {
// 				children: replaceChild(child.props.children),
// 			});

// 		}

// 		// Return unchanged child if no match
// 		return child;
// 	});
// };

export const AbstractForm = <TValues extends FieldValues,>(props: IAbstractFormProps<TValues>) => {
	const { form, children, onSubmit } = props;


	const onSubmitHandler = (values: TValues) => {
		console.log(values);
		onSubmit(values);
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmitHandler)} >ß
				{children}
			</form>
		</FormProvider>
	)
}
