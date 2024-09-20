"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface IAbstractInputProps {
	label: string;
	placeholder?: string
}

export const AbstractInput = <
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>
>({
	name,
	control,
	label,
	placeholder
}: {
	name: TName;
	control: Control<TFieldValues>;
} & IAbstractInputProps) => {


	return <FormField
		control={control}
		name={name}
		render={({ field }) => (
			<FormItem>
				<FormLabel>{label}</FormLabel>
				<FormControl>
					<Input placeholder={placeholder || ''}{...field} />
				</FormControl>
				<FormMessage />
			</FormItem>
		)}
	/>

}
