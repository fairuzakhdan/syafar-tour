"use client";

import { useCallback, useState } from "react";

/** State open/close untuk drawer, modal, dropdown, dll. */
export function useDisclosure(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((current) => !current), []);

  return { isOpen, open, close, toggle, setIsOpen };
}

export type DisclosureReturn = ReturnType<typeof useDisclosure>;
