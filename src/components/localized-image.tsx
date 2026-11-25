"use client";

import Image, { type ImageProps } from "next/image";
import { useLocalized } from "@/components/preferences";
import type { Localized } from "@/lib/content";

export function LocalizedImage({ alt, ...props }: Omit<ImageProps, "alt"> & { alt: Localized }) {
  const text = useLocalized();
  return <Image {...props} alt={text(alt)} />;
}
