import Image from "next/image";
import { Quote } from "lucide-react";
import { T } from "@/components/preferences";
import { Reveal } from "@/components/reveal";
import { executiveLeader, leadershipMessage, localize } from "@/lib/content";

export function CEOMessageSection() {
  return (
    <section className="section ceo-message-section" id="leadership-message">
      <span className="ceo-message-watermark" aria-hidden="true">FREY-M</span>
      <div className="container ceo-message-layout">
        <Reveal className="ceo-message-copy">
          <div className="ceo-message-kicker">
            <span aria-hidden="true" />
            <T value={leadershipMessage.eyebrow} />
          </div>
          <h2><T value={leadershipMessage.title} /></h2>
          <div className="ceo-message-lead">
            <Quote size={42} strokeWidth={1.5} aria-hidden="true" />
            <p><T value={leadershipMessage.lead} /></p>
          </div>
          <div className="ceo-message-paragraphs">
            {leadershipMessage.paragraphs.map((paragraph) => (
              <p key={paragraph.ar}><T value={paragraph} /></p>
            ))}
          </div>
          <div className="ceo-message-footer">
            <div className="ceo-signature">
              <span aria-hidden="true" />
              <div>
                <strong><T value={executiveLeader.name} /></strong>
                <small><T value={executiveLeader.role} /></small>
              </div>
            </div>
            <ul className="ceo-principles">
              {leadershipMessage.principles.map((principle) => (
                <li key={principle.ar}><T value={principle} /></li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal className="ceo-portrait" delay={100}>
          <div className="ceo-portrait-frame">
            <span className="ceo-portrait-index" aria-hidden="true">01</span>
            <Image
              src={executiveLeader.image}
              alt={executiveLeader.name.ar}
              fill
              quality={90}
              sizes="(max-width: 700px) calc(100vw - 28px), (max-width: 1100px) 42vw, 440px"
            />
            <div className="ceo-portrait-caption">
              <span>FREY-M</span>
              <strong><T value={localize("قيادة برؤية", "Leadership with vision")} /></strong>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
