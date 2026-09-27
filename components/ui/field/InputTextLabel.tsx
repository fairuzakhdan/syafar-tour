import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { FieldError } from "./FieldError";
import { FieldHint } from "./FieldHint";
import { FieldIcon } from "./FieldIcon";

export interface InputTextLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  prefix?: string;
  icon?: ReactNode;
}

export const InputTextLabel = forwardRef<HTMLInputElement, InputTextLabelProps>(
  function InputTextLabel(
    { label, error, hint, prefix, icon, className, id, ...props },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const hasIcon = Boolean(icon);

    return (
      <div className="flex flex-col gap-1.5">
        {label ? (
          <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
            {label}
          </label>
        ) : null}

        <div className="relative">
          {hasIcon ? <FieldIcon>{icon}</FieldIcon> : null}

          {prefix ? (
            <span
              className={cn(
                "pointer-events-none absolute inset-y-0 flex items-center text-sm text-slate-400",
                hasIcon ? "left-9" : "left-3",
              )}
            >
              {prefix}
            </span>
          ) : null}

          <input
            ref={ref}
            id={inputId}
            aria-invalid={error ? true : undefined}
            className={cn(
              "h-11 w-full rounded-xl border bg-white px-3 text-sm text-slate-900 outline-none transition",
              "placeholder:text-slate-400",
              "focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20",
              "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
              (hasIcon || prefix) && "pl-9",
              error
                ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20"
                : "border-slate-300",
              className,
            )}
            {...props}
          />
        </div>

        {error ? <FieldError>{error}</FieldError> : <FieldHint>{hint}</FieldHint>}
      </div>
    );
  },
);
