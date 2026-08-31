import { ChevronDown } from "lucide-react";
import { T } from "@/components/preferences";
import { faqs } from "@/lib/content";

export function FAQ({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`faq-list ${compact ? "compact" : ""}`}>
      {faqs.slice(0, compact ? 3 : 4).map((item) => (
        <details key={item.q.ar}>
          <summary><T value={item.q} /><ChevronDown size={18} /></summary>
          <p><T value={item.a} /></p>
        </details>
      ))}
    </div>
  );
}
