"use client";

import { usePathname } from "next/navigation";
import FloatingContactButton from "./FloatingContactButton";

export default function FloatingContactWrapper() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return null;
  }

  return <FloatingContactButton />;
}
