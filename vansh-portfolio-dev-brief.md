# Portfolio Website — Dev Brief (v2, rebuild)
**For: Vansh Bajaj** | Graphic designer with 2+ years in marketing — brand identity, social content, campaign design

---

## 1. What this site actually needs to do
This is a design portfolio, not a resume and not a marketing pitch site. The positioning is: a graphic designer who also understands marketing — not a marketer who dabbles in design, not a pure visual artist either. That combination should come through in how projects are framed (design decisions tied to what they achieved for the brand), not stated outright as a tagline. It needs to prove craft and taste before it says a single word. Every section should answer: *"can this person actually design — and does he get why it needs to work commercially?"* — visually, before verbally.

**References locked in:**
- dennissnellenberg.com → loading screen restraint, about page rhythm, page-transition interaction level
- designmill.in/work → grid structure, video-preview thumbnails, one-line taglines per project
- designmill.in testimonials → single rotating quote, linked to proof, voiced section header
- graphitya.com → services section format (numbered categories, short bullet lists)

**Direction confirmed: multi-page site with real page transitions (Dennis-style)** — not a single scrolling page.

---

## 2. Sitemap & nav
Nav: **Home / Work** — About and Contact are NOT separate pages/nav items; they live as sections on Home. Services also stays a Home section, not its own page.

- **Home** — hero → services → featured work strip → about teaser (photo + short description + "See more" button) → testimonials → contact
- **Work** — full project grid, own page, loads via transition
- **About (full)** — the complete story/background page, only reached by clicking "See more" from the Home teaser, not in the main nav

---

## 3. Page-by-page specs

### Loading screen
- Dennis Snellenberg style word-cycling preloader: words fade/animate in one after another with smooth transitions — no percentage counter, no progress bar
- Instead of his multilingual greetings ("Hello", "Bonjour", "Ciao"), cycle through your own field-related terms/tags: e.g. "Design", "Branding", "Typography", "Motion", "Craft" — same animation style, your vocabulary
- First-visit only — don't force it on every page load/return visit

### Home
**Hero:**
- Kinetic/animated typography treatment on your name + role — text that reacts to cursor or scroll, not a static heading (this is the one place to show off interaction craft before anyone sees a single project)
- Role line: something like "Graphic Designer" with a subline nodding to the marketing side (e.g. "2+ years in marketing") — design-first, marketing as the differentiator underneath, not the headline
- No paragraph bio here, no photo — name, role, one visual/interactive hook
- One line max as a subhead if needed

**Services (same-page scroll section, right after hero):**
- Numbered format (01, 02) like graphitya.com — 2-3 categories max
- Each category: short label + a clean bullet list underneath, no paragraph explanations, no pricing

**Featured work strip:**
- 3-4 pieces max, video-preview thumbnails (loop on hover / autoplay-muted on mobile)

**About teaser (right after featured work strip):**
- Small photo + a short description of you, a few lines max — not the full story
- A "See more" button that routes (with a page transition) to the full About page
- This section's whole job is to earn the click, not tell the full story

**Testimonial slider:** (see Testimonials section below)

**Contact section (right after testimonials, same page — no separate page needed):**
- Direct: no long multi-field form
- One line of copy in your voice, not "Let's talk"
- Five channels shown as a row of clickable icon buttons (rounded-square, brand-colored icons side by side — same visual style as the reference screenshot shared with the dev), not text links and not a form:
  - Instagram
  - WhatsApp (click-to-chat link, not just a number to copy)
  - Email
  - Call (tel: link — works instantly on mobile, skip on desktop or show number instead)
  - LinkedIn
- Order them by how you actually want people to reach you first — don't just list all five with equal visual weight

### Work (own page, real transition on entry)
- Grid of project cards, each with:
  - Looping video/motion preview on hover — not static screenshots, wherever the project has motion/video assets
  - Project name + a **written one-liner that repositions the work**, not a bare description (e.g. not "logo for a coffee brand" — something with a point of view)
- Filters only once there are 3+ pieces per category — otherwise skip filters entirely, an empty-looking tab is worse than no tabs
- Clicking a card opens a case-study view: large visual/video, 2-3 lines on the brief, your role, the outcome if measurable

### About (full page — reached only via "See more" from the Home teaser)
- One bold statement line up top — not "Hi, I'm Vansh"
- Story: background → saltnpeppr → how you got into design, told as a narrative not a resume
- Photo treated as a design element, not a corporate headshot
- Brand/client name-drops if you're allowed to use them (confirm permissions first)

### Testimonials
- Section header in your own voice, not the word "Testimonials"
- Single quote at a time, rotating — not a wall of cards
- Each quote links to the project it's tied to
- Only use quotes with a specific claim in them — cut anything generic ("great to work with")

---

## 4. Color palette — FINAL
- Background: `#111214` (near-black)
- Text: `#EDEDED` (off-white)
- Accent (sparing use only — hovers, CTA, loader, cursor): `#C8FF4D` (acid green)

Rule for whichever you pick: background + text stay neutral/consistent everywhere, the accent color appears in a handful of specific places only — never as a second background color.

---

## 5. Global interactions (say this explicitly to the dev)
- Real page transitions between Home ↔ Work and Home ↔ About (full page) — no hard reloads. Confirm upfront whether they're doing this in Webflow (limited) or custom code (Barba.js-equivalent, needed for this to actually work)
- Smooth scroll (Locomotive Scroll or Lenis)
- One signature interaction — either a custom cursor OR magnetic hover on links, not both
- Mobile: video previews autoplay-muted instead of hover-triggered, no cursor tricks, transitions can simplify

---

## 6. Non-negotiables to say out loud to the developer
1. "Show me a page transition and a hover interaction you've personally built before — not a template you're filling in." (This is the exact thing that went wrong last time — confirm it up front this round.)
2. "Are you building this in Webflow or custom code?" — determines what's actually possible for transitions
3. "What's your plan for mobile performance with autoplay video previews?"
4. Ask for a walkthrough of something they've built from scratch, not just a link

---

## 7. What YOU need to prep before the dev starts
- [ ] A one-liner for every project in the Work grid
- [ ] Video/motion files for every project (compressed, muted, loopable)
- [ ] 3-4 sharp, specific testimonials with permission + link to the relevant project
- [ ] Final hero name/role treatment concept (what the kinetic type should actually say/do)
- [ ] Final color palette choice from section 4
- [ ] Confirmation on which client/brand names you're allowed to display
