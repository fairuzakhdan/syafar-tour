import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { FieldError } from "./field/FieldError";
import { FieldIcon } from "./field/FieldIcon";

export interface DatePickerProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

/**
 * Date picker memakai input native `type="date"`:
 * stabil di desktop & mobile, tanpa dependency tambahan.
 */
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  function DatePicker({ label, error, icon, className, id, ...props }, ref) {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        {label ? (
          <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
            {label}
          </label>
        ) : null}

        <div className="relative">
          {icon ? <FieldIcon>{icon}</FieldIcon> : null}

          <input
            ref={ref}
            id={inputId}
            type="date"
            aria-invalid={error ? true : undefined}
            className={cn(
              "h-11 w-full rounded-xl border bg-white px-3 text-sm text-slate-900 outline-none transition",
              "focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20",
              "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
              "[&::-webkit-calendar-picker-indicator]:cursor-pointer",
              icon ? "pl-9" : "",
              error
                ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20"
                : "border-slate-300",
              className,
            )}
            {...props}
          />
        </div>

        {error ? <FieldError>{error}</FieldError> : null}
      </div>
    );
  },
);
