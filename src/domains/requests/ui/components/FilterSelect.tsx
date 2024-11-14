"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface IGenericOption {
  id?: number | string;
  name?: string;
}

export interface IFilterSelectProps<T extends IGenericOption> {
  options: T[];
  placeholder: string;
  key?: keyof T;
  onChange: (value?: T) => void;
}

export const FilterSelect = <T extends IGenericOption>({
  options,
  placeholder,
  key = "name",
  onChange,
}: IFilterSelectProps<T>) => {
  const onChangeHandler = (value: string) => {
    const obj = options.find((option) => option.id === value);
    onChange(obj);
  };

  return (
    <Select onValueChange={onChangeHandler}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.id} value={String(option.id)}>
            {option[key] as string}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
