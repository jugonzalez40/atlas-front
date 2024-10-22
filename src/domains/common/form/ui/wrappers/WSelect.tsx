"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldPath, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormStore } from "../../core/hooks/useFormStore";
import { useShallow } from "zustand/shallow";

interface TGenericOptions {
  id?: string;
  name: string;
}

interface IAbstractDateProps<T> {
  label: string;
  placeholder: string;
  options: T[];
  value?: T;
}

export const WSelect = <
  TInput extends TGenericOptions,
  TFieldValues extends FieldValues = any,
  TName extends FieldPath<TFieldValues> = any
>(
  props: {
    name: TName;
  } & IAbstractDateProps<TInput>
) => {
  const { name, label, placeholder, options, value } = props;
  const { form } = useFormStore(
    useShallow((state) => ({
      form: state.form,
    }))
  );

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const onChangeHandler = (value: string) =>
          field.onChange(options.find(({ id }) => `${id}` === value));

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select
              onValueChange={onChangeHandler}
              // defaultValue={valueSetter}
              // value={valueSetter}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={field.value?.name || "Seleccione un valor"}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {(options || []).map((option) => (
                  <SelectItem key={option.id} value={`${option.id}`}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
