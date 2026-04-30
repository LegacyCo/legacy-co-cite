# Linktree Alternative — Legacy Co + Legacy OS

## Goal
Recreate the `opensesh/linktree-alternative` page pattern using the **legacy-co-site design system** (gold/black, Archivo Black + Lora, shimmer gradients, 14px cards, pill buttons), and ship two instances:
- **Legacy Co** at `/links/` (replaces existing simpler page)
- **Legacy OS** at `/os/links/` (new, same template, different config)

Both pages share one template, one stylesheet, one JS file. Content lives in per-page config objects.

---

## Architectural decisions (proposing — confirm or redirect)

1. **Stay vanilla static HTML.** The reference is Next.js, but our repo is hand-built static HTML and the design system is already CSS-variable based. No build step.
2. **Config-driven via inline JS object** (not separate JSON file) so each page is one self-contained file that renders from its own `siteConfig`. Easy to fork for new brands.
3. **One shared stylesheet** — `/assets/linktree.css` — pulls from `/brand/legacy-co.css` tokens. Both pages link to it.
4. **One shared JS** — `/assets/linktree.js` — handles the carousel, tool selector, and any animations. Pages import it and pass their config.
5. **Skip the WebGL CRT effect.** It's a Next.js-specific OGL renderer. Replace with a subtle CSS scanline + gold radial glow that matches the existing aesthetic. (Can revisit if you want the full effect.)
6. **Keep the existing `/links/` page as a reference** — git already tracks it. New version supersedes when ready.

---

## Section mapping (reference → ours)

| Reference section | Our equivalent | Design notes |
|---|---|---|
| CardNav (sticky hamburger nav) | Use existing `.nav-center` pattern from current site | No new component — reuse standardized fixed nav (68px, 85% black blur) |
| OurLinks (social icon grid → mobile carousel) | "Social" grid: 5 icon cards | Gold-tinted borders (`rgba(201,168,76,0.10)`), hover brighten to 0.28, shimmer on focus. Mobile: scroll-snap horizontal |
| FreeResources (3 featured cards w/ "Live"/"Coming Soon" badges) | "Featured" cards: 3 resource cards | Use existing `.card-feature` pattern, gold pill badge, shimmer button CTA |
| RecentBlogs (static or RSS) | "Latest" section: 1-3 blog entries from `legacycreative.co/blueprint` | Static for now (read from config). Subscribe form below uses existing `lead-capture.js` |
| TechStack (16-tool centered carousel w/ scroll-snap + Framer fade) | "Stack" section: tools/products carousel | Scroll-snap horizontal bar, selected item scales up, detail panel below fades on change |
| Footer | Existing standardized "gold-standard" footer | No changes — already shipped |

---

## Tasks

### Phase 1 — Foundation
- [ ] 1.1 Create `/assets/linktree.css` with section-specific styles built on existing tokens
- [ ] 1.2 Create `/assets/linktree.js` with: social carousel logic (mobile scroll-snap), tools carousel (scroll-snap + click-to-center + detail fade), config renderer
- [ ] 1.3 Decide on icon strategy for socials and tools (inline SVG sprite vs. per-icon SVG files)

### Phase 2 — Legacy Co page
- [ ] 2.1 Rewrite `/links/index.html` with new 6-section structure
- [ ] 2.2 Populate `siteConfig` with Legacy Co content (KC's socials, current resources, recent Blueprint posts, tool stack: Figma, Webflow, Notion, Linear, Cursor, Claude Code, etc.)
- [ ] 2.3 Wire up subscribe form to existing `lead-capture.js` flow

### Phase 3 — Legacy OS page
- [ ] 3.1 Create `/os/links/index.html` (or `/legacy-os/links/` — confirm path)
- [ ] 3.2 Populate `siteConfig` with Legacy OS content (TBD — need brand info from you)
- [ ] 3.3 If Legacy OS has a different palette accent, expose `--accent` override at the page level

### Phase 4 — Polish
- [ ] 4.1 Test mobile carousel UX, keyboard nav on tools (left/right arrows)
- [ ] 4.2 Verify lighthouse + a11y (focus rings, ARIA on carousels)
- [ ] 4.3 Cross-check footer/nav consistency with rest of site
- [ ] 4.4 Demo screenshots, mark complete

---

## Open questions before I start

1. **Path for Legacy OS:** `/os/links/` or `/legacy-os/links/` or something else? Does Legacy OS have its own subdomain you're planning?
2. **Legacy OS brand:** is there content for it yet (tagline, socials, resources), or is it a placeholder/coming-soon state?
3. **CRT effect:** confirm skip → CSS-only ambient glow, or do you want the full WebGL effect ported over?
4. **Should the new `/links/` keep the existing hero with KC's photo?** Or replace it with the more compact CardNav + sections-only pattern from the reference?
5. **Tools carousel content for Legacy Co:** do you want creative tools (Figma, Notion, etc.) or your AI-native stack (Claude Code, Cursor, MCP servers)? Both? Other?
