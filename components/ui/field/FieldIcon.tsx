import type { ReactNode } from "react";

export interface FieldIconProps {
  children: ReactNode;
}

/** Ikon dekoratif di sisi kiri dalam field (input/select/datepicker). */
export function FieldIcon({ children }: FieldIconProps) {
  return (
    <span
      className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400"
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
