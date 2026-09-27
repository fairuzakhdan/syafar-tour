import type { ReactNode } from "react";

export interface FieldErrorProps {
  children?: ReactNode;
  id?: string;
}

/** Pesan validasi di bawah field. Tampil hanya jika ada isi. */
export function FieldError({ children, id }: FieldErrorProps) {
  if (!children) return null;

  return (
    <p id={id} role="alert" className="text-xs font-medium text-rose-600">
      {children}
    </p>
  );
}
