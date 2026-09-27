import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import { FieldError } from "./FieldError";
import { FieldHint } from "./FieldHint";

import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, error, hint, className, id, ...props }, ref) {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className={cn(
            "flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 transition",
            "hover:border-slate-300",
            error && "border-rose-400",
            className,
          )}
        >
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            aria-invalid={error ? true : undefined}
            className="h-4 w-4 shrink-0 rounded border-slate-300 accent-emerald-700"
            {...props}
          />

          {label ? (
            <span className="text-sm text-slate-700">{label}</span>
          ) : null}
        </label>

        {error ? <FieldError>{error}</FieldError> : <FieldHint>{hint}</FieldHint>}
      </div>
    );
  },
);
