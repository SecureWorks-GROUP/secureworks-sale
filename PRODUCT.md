---
canon: secureworks-docs/brand/design-system.md
movement: Architectural Assurance
register: product
last_updated: 2026-04-30
---

# Secure Sale — Product Brief (Sales Performance Dashboard)

This file exists to satisfy the impeccable setup gate. It is a thin pointer to the canon. The single source of truth is `~/Projects/secureworks-docs/brand/design-system.md`. If any field below conflicts with the canon, the canon wins.

## Register

`product` — Secure Sale is a daily-driver dashboard for the SecureWorks sales team. The interface SERVES the workflow (find leads, advance pipeline, log activity). Design quality is measured in seconds saved per task and pipeline shifts caught early, not in 90-second visitor impressions.

Note: the lookbook landing layout of `sale.html` is structurally close to what the rep workspace should look like and the user wants that layout preserved. This conformance pass re-skins surfaces only — it does not redesign.

## Users

- **Nathan (patios sales lead).** Senior salesperson. Lives in the Pipeline tab. Wants leads sorted by a kind of priority signal he can read in 3 seconds. Mostly desktop. Reading on a 27-inch monitor on his desk.
- **Khairo (fencing sales lead).** Fencing equivalent. ~$60K base + 12% GP bonus, so the leaderboard tab actually matters to him. Mixed desktop and phone use during site visits.
- **Marnin (CEO / admin).** Comparison view. Wants leaderboard, team funnel, suburb breakdown, lead-source attribution. Cares about whether automations are firing, not just numbers. Reads on phone first, then desktop deep-dive.
- **Future: junior reps onboarding.** First-week clarity is more important than power-user density.

Not these: customers, sub-contractors, anyone outside the sales-and-admin lane.

## Product Purpose

Help reps see their pipeline correctly, find the next call worth making, and log what they did. Help admin compare reps, spot stuck leads, and track lead-source ROAS without needing to open Google Ads + GHL + Xero in three browser tabs.

Conversion is downstream of trust in the data. The interface fails if the rep doesn't believe the numbers are right.

## Brand Personality

Inherited from the SecureWorks brand canon (`secureworks-docs/brand/design-system.md`). For a product surface this means:

- The surface looks like a tool a senior tradie's CFO would use — calm, structural, no celebration animations, no emoji, no "you've got this!" copy.
- Density is allowed and welcomed in admin views. Not every screen needs a hero.
- Calm-tradie default with direct-response sharpness when something is overdue.
- Plain English. No "leverage", "synergize", "boost". "Follow up on this lead" beats "Activate engagement".

Three physical-object words: **engineered, ledger, late-afternoon-warehouse-light.**

## Anti-references

Reject on sight.

**Aesthetics**
- Generic SaaS dashboard — Inter / Plus Jakarta Sans, white card on cool-grey background, 12px rounded corners on every card, white-tinted shadows. (This is the current `sale.html` failure mode.)
- Crypto / fintech dark-mode-with-neon — purple gradients, glowing border accents, Linear-style backdrop-filter blur.
- Hero-metric template — big number + small label + supporting stats + gradient accent. SaaS cliché (impeccable absolute ban).
- Identical card grids — same-sized cards with icon + heading + 2 lines of text repeated endlessly.
- Side-stripe borders thicker than 1px (impeccable absolute ban). Use full borders, leading icons, or background tints instead.
- Glassmorphism as default. Decorative blurs (impeccable absolute ban).
- Cool-grey backgrounds (`#F7F8FA`, `#F5F7FA`). Warm ground only — `#F8F6F3` page, `#FCFBFA` card.
- Pure white cards, pure black text, black-tinted shadows.
- Multiple orange CTAs in the same view.
- Modal as first thought. Exhaust inline / progressive alternatives first (impeccable absolute ban).

**Fonts**
- Inter, Plus Jakarta Sans, DM Sans, Outfit, Space Grotesk, Instrument Sans/Serif. (Identity-preservation: Helvetica Neue is the brand identity font and is allowed.)
- SF Pro Display when used to imply Apple-iness rather than to render numerals well — it shows up in `--sw-font-num` because of muscle memory, not because it earns its place.

**Copy**
- Em dashes anywhere user-visible.
- "SecureWorks WA" (old name).
- Hedging copy: "might want to consider following up". Direct: "Follow up by Friday".
- Generic empty-state ("No data") instead of contextual ("No quotes expiring this week — nice").

## Strategic principles

The Five Laws of Architectural Assurance (canon §1) applied to a product surface:

1. **Space is the primary material.** Tables can be dense, but density is a choice not an accident. Hero stats get monumental scale; supporting data contracts to clinical density.
2. **Colour is emotional architecture.** Dark blue header band, warm-grey page, white-or-warm-50 cards, surgical orange. RAG colours are utility-only — they never compete with orange for accent role.
3. **Typography operates at extreme scales.** Stat cards use condensed 48–64pt numerals. Body is 11–13pt. Don't ladder 12 → 14 → 16.
4. **Composition follows asymmetric monumentality.** The Today view's hero stat block + action items + activity feed should feel architectural, not symmetric three-card.
5. **Nothing shouts, nothing begs.** A red overdue badge is restraint; flashing yellow + bouncing animation is begging.

Hard rules (canon §2):
- Sharp edges by default (0px). Eased = 3px (inputs/buttons). Pill = 100px (chips only).
- Blue-toned shadows only. Most elements flat.
- Helvetica Neue only. No Inter, no Plus Jakarta, no Google Fonts imports.
- All brand values via CSS custom properties. No hard-coded hex inside components.
- Layout preservation: do not redesign the homepage / Today view structure during this conformance pass.
