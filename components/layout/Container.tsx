import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}
