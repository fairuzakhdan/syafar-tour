import type { ReactNode } from "react";

export interface FieldHintProps {
  children?: ReactNode;
  id?: string;
}

/** Penjelasan tambahan di bawah field (bukan error). */
export function FieldHint({ children, id }: FieldHintProps) {
  if (!children) return null;

  return (
    <p id={id} className="text-xs text-slate-500">
      {children}
    </p>
  );
}
