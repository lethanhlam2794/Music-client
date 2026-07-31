"use client";

import * as React from "react";
import { createContext, useContext, useId } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { FieldError } from "react-hook-form";

type FormFieldContextValue = {
  id: string;
  name: string;
  label: string;
  error?: FieldError;
};

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

function useFormField() {
  const ctx = useContext(FormFieldContext);
  if (!ctx) throw new Error("FormField components must be used within <FormField>");
  return ctx;
}

interface FormFieldProps {
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
}: FormFieldProps) {
  const id = useId();

  return (
    <FormFieldContext.Provider
      value={{ id: `${id}-${name}`, name, label, error }}
    >
      <div className={cn("space-y-1", className)}>
        <FormLabelUI required={required} />
        {children}
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </div>
    </FormFieldContext.Provider>
  );
}

function FormLabelUI({
  className,
  required,
  ...props
}: React.ComponentProps<"label"> & { required?: boolean }) {
  const { id, label } = useFormField();

  return (
    <Label htmlFor={id} className={cn(className)} {...props}>
      {label}
      {required && <span className="text-destructive ml-1">*</span>}
    </Label>
  );
}

export function FormLabel(props: React.ComponentProps<"label">) {
  return <FormLabelUI {...props} />;
}

export function FormControl({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id, error, name } = useFormField();

  const describedBy = error ? `${id}-message` : undefined;

  if (React.isValidElement(children)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return React.cloneElement(children as any, {
      id: (children.props as Record<string, unknown>).id ?? id,
      name: (children.props as Record<string, unknown>).name ?? name,
      "aria-describedby": (children.props as Record<string, unknown>)["aria-describedby"] ?? describedBy,
      "aria-invalid": (children.props as Record<string, unknown>)["aria-invalid"] ?? !!error,
    });
  }

  return children;
}

export function FormDescription({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  const { id } = useFormField();

  return (
    <p
      id={`${id}-description`}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function FormMessage({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  const { error, id } = useFormField();
  const message = children ?? error?.message;

  if (!message) return null;

  return (
    <p
      id={`${id}-message`}
      className={cn("text-sm text-destructive", className)}
      role="alert"
      {...props}
    >
      {message}
    </p>
  );
}

export { FormFieldContext, useFormField };
