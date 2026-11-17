# Mobile experience

Mobile styles are isolated in assets/mobile.css and loaded after desktop foundations. assets/mobile.js uses the same 700px breakpoint for shorter copy and native details disclosures. No essential service, contact or purchasing action is removed.

On phones:
- Compact homepage showcase with one visual and shorter service tabs.
- Simplified navigation with Contact us inside the menu; tap-operated Products submenu.
- Decorative hero collages, product overlays and duplicate labels removed.
- Service category links wrap instead of moving in a marquee.
- Service deliverables and four-step process expand on request.
- Single-column cards/forms, readable 16px text and inputs, and compact footer.

Desktop retains expanded content; no-JavaScript fallback retains disclosure content. System reduced motion preferences remain supported.

QA: all 16 public pages checked at 320, 360, 390, 430, 768, 844 (landscape), 1024 and 1440px widths. No document horizontal overflow found. Mobile menu, Products submenu, process and service disclosures exercised in Chrome. Contact form inputs remain 16px. These are browser viewport checks, not tests on every physical mobile device.
