# Local Projects carousel review

Local preview: http://127.0.0.1:5174/#work

All changes are local. No commits, pushes, merges, deployments, environment changes, or application-record changes were made.

## Presentation and behavior

- Order: TasteNet, ViotechPM, eDTR, ResolveDesk, TechOra, JB Nav Enterprise, Furniture DEALS Dasma.
- TasteNet is selected initially and after restoring the All work filter.
- Desktop shows three complete cards, with a larger center card. Tablet shows partial neighbors; mobile prioritizes one card.
- Side cards select their project. The active screenshot opens the original screenshot dialog.
- Mouse dragging, touch swiping, horizontal trackpad input, keyboard arrows, Home/End, and labeled pagination are supported. Vertical page scrolling stays native.
- Project links remain explicitly labeled. Desktop feature highlights appear on hover or keyboard focus; mobile details are always visible.
- Embla is the only added carousel dependency. No autoplay or carousel arrow buttons were added.
- Crimson colors, existing typography, other sections, project descriptions, and destinations are preserved.

## Live interfaces and repositories inspected

| Project | Live interface | Repository | Result |
| --- | --- | --- | --- |
| TasteNet | https://tastenet-caballeros.vercel.app/ | https://github.com/Jeyarrr/TasteNet | Live home and menu available; original ASP.NET source link preserved. |
| ViotechPM | https://viotechpm.vercel.app/ | https://github.com/Jeyarrr/ViotechPM | Sign-in and administrator overview inspected using the provided demo account. |
| eDTR | https://edtr-indol.vercel.app/ | https://github.com/Jeyarrr/eDTR | Administrator and employee views inspected using documented demo accounts. |
| ResolveDesk | https://resolvedesk-iota.vercel.app/ | https://github.com/Jeyarrr/ResolveDesk | All three documented demo roles inspected; complete 16-image gallery recaptured from the current live interface. |
| TechOra | https://techora-zeta.vercel.app/ | https://github.com/Jeyarrr/TechOra | Public shopping modules and all six administrator modules inspected using the owner-provided review login; complete 12-image gallery refreshed. |
| JB Nav Enterprise | https://jeyarrr.github.io/JB-Nav-Enterprise/ | https://github.com/Jeyarrr/JB-Nav-Enterprise | Current event landing page inspected; existing matching gallery preserved. |
| Furniture DEALS Dasma | https://furniture-deals-dasma.vercel.app/ | https://github.com/Jeyarrr/furniture-deals-dasma | Current furniture showroom and collection inspected; existing matching gallery preserved. |

All seven live URLs and all seven repository pages were accessible. Protected application views were inspected only where a demo login was available. No credentials were added to the portfolio or source files.

## Screenshot updates

- Seven local 1440px WebP carousel covers, totaling approximately 550 KB, replace large PNGs in carousel cards. Full-size PNG galleries remain available.
- TasteNet: fresh landing-page screenshot.
- ViotechPM: fresh sign-in and administrator overview.
- eDTR: fresh sign-in, administrator overview, attendance, user management, payroll, schedules, employee dashboard, and employee DTR. Its card now features the dashboard.
- ResolveDesk: 16 current images covering sign-in; administrator, employee, and agent dashboards; organizational and personal ticket queues; ticket creation; team management; escalations; reports; knowledge base and guide; notifications; settings; and SLA policies. Every older gallery image was replaced.
- TechOra: 12 current images covering storefront, catalog, product details, sign-in, registration, shopping bag, administrator dashboard, product management, orders and delivery, customers, promotions and reviews, and reports and settings. Every older gallery image was replaced.
- JB Nav and Furniture: matching authentic home captures retained; optimized WebP covers generated from the current live interface.

## Verification

- Browser review at 320, 390, 768, 1024, and 1440px: no horizontal page overflow; three visible desktop cards; centered selection.
- Browser gestures: mouse drag and mobile touch swipe select projects without accidentally opening a dialog.
- Side selection, project order, keyboard navigation, loop wrap, filters, horizontal wheel input, screenshot dialogs, image loading, and live/source destinations exercised in Chrome.
- Light theme and reduced-motion navigation checked.
- Application interaction tests updated for carousel selection. Browser tests cover Embla geometry and pointer physics; jsdom tests isolate that layout-dependent adapter.
- Production build and 18 application tests pass. The project has no lint command.

The owner supplied TechOra's administrator password privately after the initial review, enabling the full administrator refresh. It is not stored in portfolio files or committed scripts. No records, orders, tickets, account registrations, prices, stock, preferences, or policy settings were submitted or modified during the screenshot review. Empty tables and charts reflect the current live demo data; no records were fabricated to populate screenshots.
