import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className={`brand ${compact ? "brand-compact" : ""}`} href="/" aria-label="Frey-M Group">
      <span className="brand-logo" aria-hidden="true" />
    </Link>
  );
}
