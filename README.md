# Vansh Bajaj — Design Portfolio

A multi-page graphic-design portfolio built with Next.js, Tailwind CSS, Framer Motion and Lenis.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run build
npm audit --omit=dev
```

## Structure

- `/` — kinetic hero, services, featured work, about teaser and contact
- `/work` — complete work grid with accessible project-detail dialogs
- `/about` — full background and experience narrative
- `/contact` — redirects to the direct-contact section on Home

## Before public launch

- Replace representative Unsplash and Mixkit media with approved project assets.
- Add verified LinkedIn and Instagram profile URLs in `components/Footer.jsx`.
- Add approved, project-linked testimonials only when the source and permission are confirmed.
- Add measurable project outcomes wherever evidence exists.

The preloader runs once per browser session and is skipped for reduced-motion users. Smooth scrolling and background animation are also disabled when reduced motion is requested.
