"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import React from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { useShallow } from "zustand/shallow";
import { useFormStore } from "../../core/hooks/useFormStore";

interface IAbstractInputProps {
  label: string;
  placeholder?: string;
  type?: string;
}

export const WInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(
  props: {
    name: TName;
  } & IAbstractInputProps
) => {
  const { name, label, placeholder, type = "" } = props;

  const { form } = useFormStore(
    useShallow((state) => ({
      form: state.form,
    }))
  );

  return (
    <FormField
      control={form.control || null}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder || ""} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
