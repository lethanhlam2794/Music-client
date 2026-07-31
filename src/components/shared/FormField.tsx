"use client";

import {
  FormField as FormFieldPrimitive,
  FormControl,
} from "@/components/ui/form";
import type { FieldError } from "react-hook-form";

interface FormFieldWrapperProps {
  name: string;
  label: string;
  required?: boolean;
  description?: string;
  error?: FieldError;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  name,
  label,
  required = false,
  description,
  error,
  className,
  children,
}: FormFieldWrapperProps) {
  return (
    <FormFieldPrimitive
      name={name}
      label={label}
      required={required}
      description={description}
      error={error}
      className={className}
    >
      <FormControl>{children}</FormControl>
    </FormFieldPrimitive>
  );
}
