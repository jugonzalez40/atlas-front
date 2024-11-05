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
import { cn } from "@/lib/utils";

interface IAbstractInputProps {
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
}

export const WInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(
  props: {
    name: TName;
  } & IAbstractInputProps
) => {
  const { name, label, placeholder, type = "",className } = props;

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
        <FormItem className={cn(className)}>
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
