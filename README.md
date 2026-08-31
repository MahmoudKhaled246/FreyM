# Frey M Company Group

A faithful, responsive reconstruction of the supplied Frey M Company Group website references. The experience is Arabic-first and includes complete English localization, RTL/LTR layouts, persistent dark and light themes, accessible navigation, and restrained motion.

## Stack

- Next.js 16 App Router, React 19, and TypeScript
- Tailwind CSS 4 with semantic CSS theme tokens
- `next/font`, `next/image`, and Lucide icons
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

## Theme and localization

Dark mode is the default because it matches the supplied references. Theme and language choices are stored in `localStorage`; a small pre-hydration script applies them before React starts to avoid a visible flash. Semantic colors live in `src/app/globals.css` under `[data-theme]` selectors.

All visible copy and repeated content is centralized in `src/lib/content.ts`. The preference provider updates the document's `lang` and `dir` attributes so Arabic receives a native RTL layout and English receives LTR. Arabic uses Cairo and English uses Inter through `next/font`.

## Structure

```text
src/
  app/                 routes, metadata, and global styles
  components/          layout, controls, cards, forms, and motion
  lib/content.ts       localized content and structured data
public/images/         hero, project, service, team, and company imagery
```

## Reference assumptions

The archive contained full-page screenshots rather than original production assets. Section imagery was carefully isolated from those references, and the hero photographs were cleaned of embedded website text so headings remain real, accessible, and localizable. Only the routes and project detail clearly evidenced by the screenshots were created. The enquiry form is an interface demonstration and needs an API or email service before production submissions can be delivered.
