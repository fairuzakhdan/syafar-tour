"use client";

import { useEffect } from "react";

/**
 * Kunci scroll body saat overlay (drawer/modal) terbuka.
 * Nilai overflow sebelumnya dikembalikan saat dilepas.
 */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [locked]);
}
