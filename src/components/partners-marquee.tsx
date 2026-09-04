import Image from "next/image";
import { partners } from "@/lib/content";

export function PartnersMarquee() {
  const rows = [partners.slice(0, 4), partners.slice(4, 8)];

  return (
    <div className="partners-marquee-stack">
      {rows.map((row, rowIndex) => (
        <div className="partner-marquee" key={rowIndex}>
          <div
            className={`partner-marquee-track${rowIndex === 1 ? " reverse" : ""}`}
          >
            {[false, true].map((duplicate) => (
              <div
                className="partner-marquee-group"
                aria-hidden={duplicate || undefined}
                key={duplicate ? "duplicate" : "original"}
              >
                {row.map((partner) => (
                  <div className="partner-logo-card" key={partner.name.en}>
                    <Image
                      className="partner-logo"
                      src={partner.logo}
                      alt={
                        duplicate
                          ? ""
                          : `${partner.name.ar} — ${partner.name.en}`
                      }
                      width={1024}
                      height={1024}
                      sizes="(max-width: 700px) 48vw, (max-width: 1280px) 24vw, 276px"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
