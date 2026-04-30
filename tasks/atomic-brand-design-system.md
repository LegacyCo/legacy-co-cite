# The Atomic Brand Design System

A Legacy Co. reference for designing a full brand or service system using atomic design principles.

> **Filing:** lives in `LC | COMMON LIBRARY/04_DESIGN KITS` as the design kit reference, and in `LC | COMMON LIBRARY/claude/design` as the client-facing methodology reference. Use Part 1 for design-kit work, Part 2 for client conversations and project workflow.

A brand isn't a logo. It's a system. The most resilient brand systems are composed the same way the most resilient digital products are — atomically. Small, defined primitives compose into larger, defined patterns, which compose into archetypes, which become the brand in the wild.

This reference documents:
1. **The architecture** of an atomic brand design system (the layout of the kit).
2. **The workflow** Legacy Co. uses to design a full system for a brand or service through those layers.

Adapted from Brad Frost's atomic design (originally a UI/web framework), extended to cover the full surface of brand expression — visual, verbal, motion, and environmental.

---

## Part 1 — System Architecture

Five compositional layers, plus a governance layer that wraps them all.

### Layer 1 — Atoms (Foundations / Tokens)

The smallest indivisible primitives. Atoms carry meaning but are rarely useful alone.

**Visual atoms**
- **Color tokens** — primary, secondary, neutrals, semantic (success / warn / error), surface tones
- **Type tokens** — typeface families, weight scale, size scale, leading, tracking
- **Spacing tokens** — base unit (e.g. 4px / 8px) and the scale built off it (×0.5, ×1, ×2, ×4, ×8)
- **Radius tokens** — corner geometry vocabulary
- **Stroke tokens** — line weights, dash patterns
- **Grid tokens** — column count, gutters, margins, breakpoints

**Identity atoms**
- **Logo marks** — primary, monogram, wordmark, secondary marks
- **Iconography primitives** — stroke style, terminals, geometry rules
- **Pattern primitives** — repeating motifs, textures, graphic devices
- **Photography rules** — color treatment, crop rules, subject framing
- **Illustration rules** — style, palette constraints, line behavior

**Verbal atoms**
- **Voice tokens** — signature vocabulary, banned words, signature phrasing
- **Tone modifiers** — situational shifts (e.g. *warmer when onboarding, sharper in pricing*)

**Motion atoms**
- **Durations** — fast / medium / slow
- **Easing curves** — signature ease, plus utility curves

> A token isn't a decision. A token is a **defined unit that other decisions are built from.**

### Layer 2 — Molecules (Combinations)

The smallest meaningful pairings. Molecules are where the brand begins to *feel* like itself.

- **Logo lockups** — logo + tagline, logo + URL, co-brand, vertical / horizontal
- **Type pairings** — display + body, eyebrow + headline, caption pairs
- **Color combinations** — accessibility-validated palette pairings, gradient definitions
- **Buttons** — primary / secondary / tertiary, with full state set (hover, active, disabled, focus)
- **Form fields** — label + input + helper, with validation states
- **Badges, tags, pills, chips**
- **Photo + caption pairs** — the art-direction grammar
- **Headline structures** — voice formulas (e.g. *verb + outcome + audience*)
- **Iconography sets** — icons applied at canonical sizes with canonical color combos

> A molecule is a **decision recorded as a reusable pattern.**

### Layer 3 — Organisms (Modules)

Self-contained compositions of molecules and atoms. Organisms are where the brand becomes **extensible** — anyone with the kit can build new things on-brand.

**Digital organisms**
- Hero modules
- Navigation systems (primary, secondary, mobile, footer)
- Card systems (testimonial, product, team, blog, case study)
- Section patterns (split, grid, full-bleed, sticky)
- Forms (sign-up, contact, multi-step)
- Email modules

**Document organisms**
- Slide modules (title, content, quote, two-column, full image)
- Page modules (cover, contents, section divider, body, callout)
- Letterhead, business card, signature blocks

**Marketing organisms**
- Social post modules (quote, announcement, carousel, product)
- Ad modules (display sizes)
- Banner / billboard modules
- Newsletter blocks

**Environmental organisms**
- Signage systems
- Booth / event modules
- Packaging modules
- Vehicle / wearable applications

### Layer 4 — Templates (Archetypes)

Page-, document-, and asset-level structures with **content slots, not real content**. Templates define the canonical containers the brand ships in.

- **Web archetypes** — home, about, product, pricing, blog post, landing page, contact
- **Document archetypes** — proposal, deck, one-pager, case study, report
- **Marketing archetypes** — campaign launch, newsletter, social campaign, product drop
- **Environmental archetypes** — storefront, booth, packaging family, vehicle wrap

> A template says: *"this is what a [thing] looks like in this brand, before you fill it with real content."*

### Layer 5 — Pages / Applications (Instances)

Real, populated, art-directed instances of templates. The brand in the wild.

- The live site
- The actual investor deck
- The shipped product packaging
- The social campaign that ran last quarter
- The conference booth that was built

Pages are where the system meets reality — and where feedback flows back upstream to revise atoms, molecules, and organisms.

### Layer 0 — Governance (the system around the system)

Atomic design omits this. Brand systems can't.

- **Token source of truth** — Figma variables / design tokens / JSON
- **Component library** — Figma library + code library mirror where applicable
- **Documentation** — usage examples, examples of misuse, do / don't
- **Versioning** — semver-style for the brand system, with a changelog
- **Contribution model** — who can propose changes, who approves, how they ship
- **Audit cadence** — quarterly review of where the system is breaking in the wild

---

## Part 2 — How Legacy Co. Designs a Full Brand or Service System

The architecture is also a workflow. Each layer corresponds to a phase of work.

### Phase 1 — Strategy → Atom Definition

**Goal:** translate brand strategy into measurable, reusable primitives.

**Inputs:** positioning, audience, brand attributes, competitive landscape, voice direction.

**Output:** a defined set of atoms (color tokens, type tokens, voice tokens, spacing scale, motion primitives, logo mark) with **rationale** for each token tied back to strategy.

**Test of done:** every atom can answer *"why this and not something else?"* in one sentence rooted in strategy.

### Phase 2 — Identity → Molecule Construction

**Goal:** build first-order combinations until the brand has a recognizable *grammar*.

**Inputs:** atoms + strategy.

**Output:** lockups, type pairings, button system, color combinations, headline formulas, photo + caption art-direction rules.

**Test of done:** a designer who has never seen the brand can build a new molecule that *feels right* from the kit alone.

### Phase 3 — System → Organism Library

**Goal:** make the brand **extensible** so it doesn't depend on its original designers.

**Inputs:** molecules + atoms.

**Output:** a library of self-contained modules covering the surfaces the brand will actually live on — web sections, slide modules, social post modules, email modules, environmental modules.

**Test of done:** someone outside the brand team can compose a new asset using only organisms and have it stay on-brand.

### Phase 4 — Expression → Templates

**Goal:** define the canonical archetypes the brand ships in.

**Inputs:** organisms + a list of recurring deliverables the brand needs (home page, sales deck, monthly newsletter, packaging family, etc.).

**Output:** a finite set of templates per surface, each composed of organisms in a defined order with content slots and rules.

**Test of done:** every recurring deliverable type maps to exactly one template (or a defined variant of one).

### Phase 5 — Activation → Pages / Applications

**Goal:** populate templates with real content, ship them, observe.

**Output:** the actual brand expressions in the world — the site, the deck, the campaign, the packaging.

**Test of done:** shipped work that holds together as a system rather than as one-off artifacts. Friction points (places where templates didn't fit, where designers had to invent) feed back into Phase 1–4 revision.

### Phase 6 — Governance → System Maintenance

**Goal:** keep the system alive and accurate as the brand evolves.

**Activities:** versioning, audit cadence, contribution review, training new contributors, refactoring atoms when patterns reveal flaws.

**Test of done:** the system is referenced more often than it is rebuilt.

---

## How to Use This Reference

**As a design-kit reference (`LC | COMMON LIBRARY/04_DESIGN KITS`)** — read Part 1 to map a brand's deliverables to the atomic layers, and use it as the table of contents for any Figma library you build. Every kit Legacy Co. ships should be able to answer "what's an atom, what's a molecule, what's an organism, what's a template" for the brand it serves.

**As a client-facing methodology reference (`LC | COMMON LIBRARY/claude/design`)** — read Part 2 to explain *why* the work is structured into phases and what the client gets at each one. Use it to set expectations early ("we don't design pages first — we design the system that makes every page possible") and to scope phases of engagements.

**Quick rule of thumb:** if you're about to design something one-off, stop and ask which layer it belongs to. If the answer is "page," verify the template exists. If not, build the template (and the organisms it needs) first. The system pays back the time on every subsequent piece.
