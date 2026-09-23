# BuiltByJayr

A responsive personal portfolio built with React, Vite, Bootstrap 5, Tailwind CSS 4, and Motion for React. The original graphite-and-lime design uses editorial typography and controlled motion, inspired by the quality goals in the MotionSites brief.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. For a production build, run `npm run build`. To preview that build, run `npm run preview`.

Run `npm test` for interaction checks and `npm run format` to format the source files. The tests use jsdom; native browser layout and dialog focus containment still require a browser check.

## Deploy to Vercel

Import the existing `Jeyarrr/Builtbyjayr` GitHub repository into Vercel, or run `vercel deploy --prod` from this folder after signing in. `vercel.json` sets the Vite framework, `npm run build`, and the `dist` output directory. Connect the existing repository in Project Settings → Git to deploy future pushes automatically; do not clone it into a second repository.

## Make it yours

Edit `src/content.js` to change your name, role, introduction, biography, email, social links, and projects. Profile information and the portrait were adapted from https://jeyarrr.github.io/Portfolio/. TechOra details and its product image come from https://github.com/Jeyarrr/TechOra. Its live link is https://techora-store.vercel.app/.

Experience lives in `src/components/ExperienceTimeline.jsx` (exported through `src/Experience.jsx`); education lives in `src/components/Education.jsx`. Each major section has its own component. The About section uses `public/jayr-cutout.png`, a transparent portrait cutout.

Project artwork is explicitly labeled as a stylized illustration. To use actual screenshots, place optimized WebP/AVIF images in `public/projects/` and set the corresponding project's `image` in `src/content.js`, for example `/projects/techora.webp`. Use a consistent landscape crop around 1440 × 1000. Screenshots are lazy-loaded and fall back to the illustrations if unavailable. Each project links directly to its live site or Figma prototype; source links are included where a public repository is known.

Set `profile.email` to enable the contact form's email draft flow. Without an email, the form copies the inquiry and explicitly says nothing was sent. There is no backend or message storage. Social links appear when their URLs are supplied.

## Styling

Bootstrap supplies the responsive grid and form styles. Tailwind's theme and utilities are imported with a `tw` prefix and without Preflight to prevent conflicts with Bootstrap. Use utilities such as `tw:relative` or `tw:font-medium`. Existing visual foundations and illustration styles live in `src/styles.css`. The new editorial layouts, breakpoints, and interaction styles live in `src/motion.css`. Manrope is served locally through Fontsource; no third-party font request is needed.

Project dialogs use the native modal dialog element for keyboard focus containment and Escape handling. The site supports reduced motion and visible keyboard focus.

## Theme and icons

The sun/moon control switches between light and dark mode. The first visit follows the OS color preference; a manual choice is saved locally and takes precedence. `public/theme-init.js` applies the preference before the app paints. Theme state is in `src/theme/ThemeProvider.jsx`, and semantic palette tokens and component colors are in `src/theme.css`.

Technology logos are local SVGs from Devicon, including distinct Git/GitHub marks, Azure, and Visual Studio Code. The license and source information are in `public/icons/`. Update their mapping in `src/components/BrandIcon.jsx`. Section spacing is set in `src/motion.css` (30px top / 44px bottom on desktop, 26px / 40px on tablet, and 20px / 34px on mobile).

## Motion system

`src/motion/MotionSystem.jsx` centralizes the easing curve, timing, responsive interaction policy, `Reveal`, `RevealText` (line, word, or fade), `MagneticLink`, and section introductions.

- Micro-interactions: 200ms. UI transitions: 350ms. Section reveals: 650ms.
- Hero text and signature complete their main entrance within roughly 1.2 seconds. The background settles once over 4 seconds; nothing loops continuously.
- Normal browser scrolling stays intact. The desktop hero uses small scroll-linked transforms, and each section's top rule draws in as it enters view.
- Pointer tilt and magnetic links require a fine mouse pointer, hover support, and a viewport at least 992px wide. Project tilt is capped around 1.5 degrees; buttons move at most 4px horizontally and 3px vertically.
- System reduced-motion preferences are observed live. The header pause control persists the visitor's preference locally. Both disable decorative motion, parallax, layout animation, and smooth anchor scrolling.
- Section content becomes visible when keyboard focus enters it. Navigation supports Escape; project dialogs return focus to their trigger.
- No custom cursor, WebGL, GSAP, external trackers, or fabricated performance claims.

## Verification

`npm test` checks filtering, project dialogs and focus restoration, mobile navigation, contact validation/fallback, TechOra destinations, section order, persisted motion preferences, and live OS preference changes. These are jsdom integration tests, not visual browser or frame-rate tests.

Before publishing, review at 1440px, 1024px, 768px, and 390px: scroll through every section, try every filter and modal, navigate with the keyboard, and enable reduced motion. Headless Chrome screenshots confirmed the desktop section layout and visible headings; interactive motion and device performance still need a real browser review.
