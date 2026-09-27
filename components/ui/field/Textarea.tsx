import { forwardRef, useId } from "react";
import type { TextareaHTMLAttributes } from "react";
import { FieldError } from "./FieldError";
import { FieldHint } from "./FieldHint";

import { cn } from "@/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ label, error, hint, className, id, rows = 3, ...props }, ref) {
    const generatedId = useId();
    const textareaId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        {label ? (
          <label htmlFor={textareaId} className="text-sm font-medium text-slate-700">
            {label}
          </label>
        ) : null}

        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          aria-invalid={error ? true : undefined}
          className={cn(
            "w-full resize-y rounded-xl border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition",
            "placeholder:text-slate-400",
            "focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20",
            "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
            error
              ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20"
              : "border-slate-300",
            className,
          )}
          {...props}
        />

        {error ? <FieldError>{error}</FieldError> : <FieldHint>{hint}</FieldHint>}
      </div>
    );
  },
);
