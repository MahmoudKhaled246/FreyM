"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLocalized, usePreferences } from "@/components/preferences";
import type { Localized } from "@/lib/content";
import { localizePath } from "@/lib/locale";

export function LocalizedLink({ href, label, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href: string; label?: Localized }) {
  const { language } = usePreferences();
  const text = useLocalized();
  return <Link aria-label={label ? text(label) : undefined} {...props} href={localizePath(href, language)} />;
}
