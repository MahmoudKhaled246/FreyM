# Frey M Company Group

A faithful, responsive reconstruction of the supplied Frey M Company Group website references. The experience is Arabic-first and includes complete English localization, RTL/LTR layouts, persistent dark and light themes, accessible navigation, and restrained motion.

## Stack

- Next.js 16 App Router, React 19, and TypeScript
- Tailwind CSS 4 with semantic CSS theme tokens
- Self-hosted Cairo and Inter fonts, `next/image`, and Lucide icons
- Server Components by default; Client Components only for preferences and interaction

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production checks:

```bash
npm run lint
npm run build
npm run start
```

## Routes

- `/` — home
- `/about` — company profile
- `/services` — services
- `/projects` — project archive with category filters
- `/projects/operating-rooms` — project detail
- `/contact` — contact information, FAQs, and enquiry form
- `/news` and `/news/[slug]` — news and article details
- `/privacy` and `/terms` — privacy and terms

English versions use `/en` with the same paths, such as `/en/services`. Each language has its own canonical URL, title, description, and sharing metadata. Both versions appear in `/sitemap.xml`.

## Deploy on Hostinger

1. Use hPanel **Websites → Create site → Web App** on a Business or Cloud plan with Node.js support. Deploy the reviewed Git revision with the **Next.js** preset, Node.js **24.x**, npm, the repository root, and `npm run build`. Leave `SITES_STATIC_EXPORT` unset so the contact API runs on the deployed server.
2. Before a public launch, install the current patched stable Next.js and matching `eslint-config-next`, commit the regenerated lockfile, and rerun `npm audit --omit=dev`, `npm run lint`, and `npm run build`. Next.js 16.3.3 is affected by [published image optimization advisories](https://github.com/vercel/next.js/security/advisories). As of 2026-11-25, 16.4.6 is the patched stable version verified for these advisories.
3. Set `NEXT_PUBLIC_SITE_URL` to the final canonical HTTPS URL before building. The default is `https://www.freymcompanygroup.com`, with a permanent redirect from `freymcompanygroup.com`. Use `SITE_INDEXABLE=false` for a preview deployment and omit it for production. Set `GOOGLE_SITE_VERIFICATION` if verifying Search Console through an HTML meta tag.
4. Add the contact settings below in hPanel. After deploying, confirm the HTTPS site and canonical host redirect, open `/robots.txt` and `/sitemap.xml`, and submit a test enquiry from the production contact form to confirm receipt. Then submit the sitemap in Google Search Console.

## Contact email through SMTP

1. Choose the mailbox that will send enquiries. For Gmail, enable 2-Step Verification and create a [Google App Password](https://myaccount.google.com/apppasswords) if the account supports it. For Hostinger Email, use the mailbox credentials from its Emails panel.
2. Add the following variables to the Next.js host, or to `.env.local` for local testing. This configuration uses SMTP on port 465 with TLS.

   ```dotenv
   CONTACT_SMTP_HOST=smtp.gmail.com
   CONTACT_SMTP_USER=your_sending_mailbox@gmail.com
   CONTACT_SMTP_PASSWORD=your_google_app_password
   CONTACT_TO_EMAIL=freymcompanygroup@gmail.com
   ```

3. For Hostinger Email, change the host to `smtp.hostinger.com` and use the full mailbox address and mailbox password. Restart or redeploy Next.js, submit an enquiry from `/contact`, and check the recipient's inbox. Replying to the enquiry goes to the address entered in the form.

The form uses `POST /api/contact` on a Next.js server. Allow outbound TCP connections on port 465 from this server. If the website is published as a static export, run a server build on an HTTPS host for this endpoint. Set `CONTACT_ALLOWED_ORIGIN` on that server to the static website's exact origin, such as `https://www.freymcompanygroup.com`, and set `NEXT_PUBLIC_CONTACT_ENDPOINT` to the full server URL (including `/api/contact`) before building the static website. Keep the SMTP credentials on the server.

## Theme and localization

Dark mode is the default. The theme is stored in `localStorage` and applied before hydration. Semantic colors live in `src/app/globals.css` under `[data-theme]` selectors.

Shared copy lives in `src/lib/content.ts`. The route determines the document's `lang` and `dir` on the server. Arabic uses Cairo and English uses Inter. The font files are served locally from `public/fonts`.

## Structure

```text
src/
  app/                 routes, metadata, and global styles
  components/          layout, controls, cards, forms, and motion
  lib/content.ts       localized content and structured data
public/images/         hero, project, service, team, and company imagery
```

## Reference assumptions

Field photography comes from the company’s supplied images. The service and project illustrations supplement the field photography, and the office illustration uses the Frey-M brand artwork.
