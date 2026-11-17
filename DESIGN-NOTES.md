# Tenacore revision 2

## Direction

Based on the supplied reference: an airy sky-blue opening, centred headline, rounded navigation, large layered preview, blue/black actions, and a white page with varied section compositions. The reference is a visual guide; its branding, claims, pricing, and product content are not copied.

## Page story

Home: what Tenacore does → three business needs → related services → billing and network products → examples of work → how the work happens → common questions → contact.

Services: each section has one shared service title, a plain customer question, a direct explanation, a concrete example, and the matching deliverables. The left and right columns belong to the same service.

About: identifies Tenacore as a digital and IT solutions company immediately. Explains what the company does, why those capabilities sit together, and how a client can start with one requirement.

All 17 pages remain separate static HTML documents. All six service categories, both product areas, and all seven portfolio projects are retained.

## Typography

- Navigation: 16px desktop/tablet; 18px mobile menu.
- Body: 18px desktop; 16–18px mobile depending on context.
- Buttons, fields, meaningful links, and service lists: at least 16px.
- Secondary labels/captions: 14px.
- Shared foundation file: assets/design-system.css.
- Layout file: assets/site.css.
- Visual reference: design-system.html.

## Checks

Representative page templates checked at 390, 768, and 1440px. Key pages additionally checked at 320px. No horizontal page overflow found in these checks. All checked pages have one H1. Verified hero tabs, keyboard navigation, mobile product menu and Escape handling, portfolio filters, contextual enquiry topics containing '&', and empty-form validation. No page console errors observed.

## Hosting

Upload the HTML files and assets directory together. No build process or external CDN is required. Form delivery still requires configuration in assets/config.js. By default the form opens an email draft; it never claims to send the enquiry itself.

The prior build was preserved as Tenacore-New-v1-backup.zip in the workspace before this revision.

## Sky asset provenance

File: assets/images/sky-v2.jpg
Generation: built-in image_gen tool, followed by JPEG conversion for the website.

Final generation prompt:

Use case: photorealistic-natural. Asset type: wide website hero background. Create a quietly beautiful panoramic daytime sky photograph, pale clean cyan across the upper center, soft ivory-white cumulus clouds entering only from the far left and right edges and lower corners, rich but soft cornflower blue around bottom edges, very airy bright high-key light. A large empty calm very pale blue center and upper center must remain clean for black website headline and navigation. Natural clouds with realistic delicate fine texture, photographic not cartoon, no gradients pretending to be clouds, no objects, no text, no logos, no UI. Composition 16:9 landscape, premium airy atmosphere. Save a local output file for use as a website asset.

All interfaces and diagrams are HTML/CSS/SVG. Project imagery comes from the supplied Tenacore website. Phosphor Regular SVGs and Manrope are locally hosted; their licenses are included in assets/icons/LICENSE and assets/fonts/OFL.txt.
