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

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
});

interface IAbstractDateProps {
  label: string;
  placeholder: string;
}

export const Wselect = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(
  props: {
    name: TName;
  } & IAbstractDateProps
) => {
  const { name, label, placeholder } = props;
  const { form } = useFormStore(
    useShallow((state) => ({
      form: state.form,
    }))
  );

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="m@example.com">m@example.com</SelectItem>
              <SelectItem value="m@google.com">m@google.com</SelectItem>
              <SelectItem value="m@support.com">m@support.com</SelectItem>
            </SelectContent>
          </Select>
          {/* <FormDescription>
            You can manage email addresses in your{" "}
            <Link href="/examples/forms">email settings</Link>.
          </FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
