"use client";

import { useEffect, useRef } from "react";

/**
 * Jalankan callback saat tombol Escape ditekan.
 * Callback terbaru selalu dipakai tanpa perlu daftar ulang listener.
 */
export function useEscapeKey(callback: () => void, enabled = true) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") savedCallback.current();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled]);
}
