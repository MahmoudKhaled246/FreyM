import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { FAQ } from "@/components/faq";
import { PartnersMarquee } from "@/components/partners-marquee";
import { Reveal } from "@/components/reveal";
import { T } from "@/components/preferences";
import { PageHero, SectionHeading } from "@/components/ui";
import { common, localize } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/contact");

export default function ContactPage() {
  return (
    <>
      <PageHero
        image="/images/illustrations/engineering-consultation.webp"
        className="contact-page-hero"
        eyebrow={localize(
          "خدمة العملاء والدعم الفني",
          "Client service & technical support",
        )}
        title={localize("تواصل مع خبرائنا", "Speak with our experts")}
        body={localize(
          "نحن هنا للإجابة على استفساراتكم الهندسية وتقديم الدعم اللازم لمشاريعكم القائمة والمستقبلية.",
          "We are here to answer your engineering questions and support your current and future projects.",
        )}
      />
      <section className="section">
        <div className="container contact-cards-grid">
          <Reveal className="contact-card">
            <div className="icon-tile">
              <MapPin size={23} />
            </div>
            <h3>
              <T value={localize("المقر الرئيسي", "Head office")} />
            </h3>
            <p>
              <T value={common.address} />
            </p>
          </Reveal>
          <Reveal className="contact-card" delay={70}>
            <div className="icon-tile">
              <Phone size={23} />
            </div>
            <h3>
              <T value={localize("اتصل بنا", "Call us")} />
            </h3>
            <a dir="ltr" href={`tel:${common.phone}`}>
              {common.phone}
            </a>
            <p>
              <T
                value={localize(
                  "متاحون طوال أيام الأسبوع لخدمتكم",
                  "Available throughout the working week",
                )}
              />
            </p>
          </Reveal>
          <Reveal className="contact-card" delay={140}>
            <div className="icon-tile">
              <Mail size={23} />
            </div>
            <h3>
              <T value={localize("راسلنا إلكترونيًا", "Email us")} />
            </h3>
            <a href={`mailto:${common.email}`}>{common.email}</a>
            <p>
              <T
                value={localize(
                  "نرد على جميع الاستفسارات خلال 24 ساعة",
                  "Replies within one business day",
                )}
              />
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section section-muted">
        <div className="container contact-grid">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal className="contact-side">
            <div className="about-copy">
              <h2>
                <T value={localize("ساعات العمل", "Working hours")} />
              </h2>
            </div>
            <div className="contact-card">
              <Clock3 size={22} />
              <h3>
                <T value={localize("السبت - الخميس", "Saturday – Thursday")} />
              </h3>
              <p>
                <T
                  value={localize(
                    "من 9:00 صباحًا إلى 5:00 مساءً",
                    "9:00 AM to 5:00 PM",
                  )}
                />
              </p>
            </div>
            <div className="about-copy">
              <h2>
                <T
                  value={localize("فروعنا الدولية", "International presence")}
                />
              </h2>
            </div>
            <div className="contact-card">
              <h3>
                <T value={localize("فرع ليبيا", "Libya office")} />
              </h3>
              <p>
                <T value={localize("طرابلس - ليبيا", "Tripoli, Libya")} />
              </p>
              <a dir="ltr" href="tel:+218916789345">
                +218 91 6789 345
              </a>
            </div>
            <div className="about-copy">
              <h2>
                <T value={localize("تابعونا", "Follow us")} />
              </h2>
            </div>
            <div className="social-links">
              <a
                className="social-link social-facebook"
                href="https://www.facebook.com/p/FREY-M-Company-Group-61577563187413/"
                aria-label="Facebook"
                title="Facebook"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14 24V13h3.7l.6-4.3H14V6c0-1.2.4-2.1 2.2-2.1h2.3V.2A31 31 0 0 0 15.2 0C12 0 9.7 2 9.7 5.7v3H6V13h3.7v11H14Z" />
                </svg>
              </a>
              <span className="social-link social-youtube" role="img" aria-label="YouTube" title="YouTube">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12c0 1.9.2 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12c0-1.9-.2-3.9-.5-5.8ZM9.6 15.6l6.2-3.6-6.2-3.6v7.2Z" />
                </svg>
              </span>
              <span className="social-link social-linkedin" role="img" aria-label="LinkedIn" title="LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5V9.5h3V19ZM6.5 8.2A1.7 1.7 0 1 1 6.5 4.8a1.7 1.7 0 0 1 0 3.4ZM19 19h-3v-4.6c0-1.1 0-2.5-1.6-2.5s-1.8 1.2-1.8 2.4V19h-3V9.5h2.9v1.3h.1a3.1 3.1 0 0 1 2.8-1.5c3 0 3.6 2 3.6 4.5V19Z" />
                </svg>
              </span>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            centered
            title={localize("الأسئلة الشائعة", "Frequently asked questions")}
            body={localize(
              "كل ما تحتاج معرفته عن خدمات مجموعة فري إم.",
              "What clients most often ask about Frey-M services.",
            )}
          />
          <FAQ compact />
        </div>
      </section>
      <section className="section section-muted partner-section">
        <div className="container partner-heading">
          <div className="eyebrow centered">
            <span />
            <T value={localize("شركاء النجاح المعتمدون", "Trusted clients")} />
            <span />
          </div>
        </div>
        <PartnersMarquee />
      </section>
    </>
  );
}
