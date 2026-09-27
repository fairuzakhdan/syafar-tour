"use client";

import type { ReactNode } from "react";

import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { X } from "lucide-react";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

/**
 * Panel selalu ada di DOM lalu tinggal berpindah kelas — animasi buka/tutup
 * jadi urusan CSS, tanpa state maupun timer di effect.
 */
export function Drawer({
  open,
  onClose,
  title,
  description,
  children,
  footer,
}: DrawerProps) {
  useLockBodyScroll(open);
  useEscapeKey(onClose, open);

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
    >
      <button
        type="button"
        aria-label="Tutup panel"
        onClick={onClose}
        className={`absolute inset-0 h-full w-full cursor-default bg-slate-900/40 backdrop-blur-[2px] transition-opacity duration-300 motion-reduce:transition-none
          ${open ? "opacity-100" : "opacity-0"}`}
      />

      <div
        role="dialog"
        aria-modal={open}
        inert={!open}
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-slate-50 shadow-2xl transition-transform duration-300 motion-reduce:transition-none
          ${open ? "translate-x-0 ease-out" : "translate-x-full ease-in"}`}
      >
        <header className="flex items-start justify-between gap-3 border-b border-slate-200 bg-white px-5 py-4">
          <div>
            {title ? (
              <h2 className="text-base font-bold text-slate-900">{title}</h2>
            ) : null}
            {description ? (
              <p className="mt-0.5 text-sm text-slate-500">{description}</p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-2 focus-visible:outline-emerald-700"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>

        {footer ? (
          <footer className="shrink-0 border-t border-slate-200 bg-white px-5 py-4">
            {footer}
          </footer>
        ) : null}
      </div>
    </div>
  );
}
