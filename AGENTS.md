> **Docs hub:** read [`/Users/marninstobbe/Projects/secureworks-docs/CLAUDE.md`](/Users/marninstobbe/Projects/secureworks-docs/CLAUDE.md) first for the where-to-look table + canonical-source decision tree. **Live operational data** (jobs, invoices, contacts, POs) → Supabase `kevgrhcjxspbxgovpmfl`, never the wiki. **Historical/archived docs** (anything under `_archive/`, `strategy/dreaming/`, or carrying a "HISTORICAL SNAPSHOT" banner) are not current canon — cross-check `strategy/master-plan.md` v1.1 (2026-04-17) before acting on anything older than 2026-04.

---

# SECURE SALE — SALES PERFORMANCE DASHBOARD

## What This Is

Sales dashboard for SecureWorks WA salespeople (Nathan, Khairo) and admin (Marnin). Part of the Secure Suite alongside CEO, Ops, and Trade dashboards. Single-file HTML app deployed to GitHub Pages.

---

## Business Context

**Company:** SecureWorks WA Pty Ltd — outdoor living construction (Perth, Western Australia)
**Who uses this:**
- **Salespeople** (Nathan, Khairo): Track their pipeline, follow-ups, leads, and performance
- **Admin** (Marnin): Compare salespeople, view team metrics, leaderboard

---

## Brand Rules

| Colour | Hex | Use |
|--------|-----|-----|
| SecureWorks Orange | `#F15A29` | CTAs, accents, buttons |
| Dark Dusty Blue | `#293C46` | Headings, dark backgrounds |
| Mid Dusty Blue | `#4C6A7C` | Secondary text, borders |
| White | `#FFFFFF` | Backgrounds |

- **No pure black** for headings — use Dark Dusty Blue
- **No orange as large background** — accent only
- CSS variables: `--sw-orange`, `--sw-dark`, `--sw-mid`, etc.

---

## File Structure

```
secureworks-sale/
├── sale.html              ← The entire dashboard
├── shared/
│   ├── cloud.js           ← Copied from patio-tool canonical
│   └── brand.js           ← Copied from secureworks-site
├── AGENTS.md              ← This file (CLAUDE.md is a symlink to it)
```

Everything is in `sale.html`. Do NOT split into multiple files.

---

## Architecture

### Auth
- Email/password login via cloud.js → Supabase auth
- Admin detection: email contains 'marnin' OR role === 'admin'
- Admin sees all data + salesperson dropdown filter
- Salespeople see only their own data (filtered by `created_by` = user.id)

### Data Sources
- **reporting-api** edge function: `sales_summary`, `sales_pipeline`, `sales_performance`, `sales_leads` actions
- **ops-api** edge function: `add_event` (log activity), `list_users` (admin dropdown)
- Supabase project: `kevgrhcjxspbxgovpmfl`

**Two read paths — pick deliberately.** The edge-function helpers (`saleFetch`/`opsFetch`) send a hardcoded `x-api-key` (`SW_API_KEY`) that is a known public-repo secret exposure. For anything new, prefer the **authenticated Supabase client** `cloud.supabase` (`window.SECUREWORKS_CLOUD.supabase`), which runs under the logged-in user's session + RLS with no shared key. The Follow-up view uses this path against the `v_sales_priority` view; do not route its customer-data reads through the key path.

### Tabs
1. **Today** — Stat cards, action items (follow-ups, expiring quotes), activity feed
2. **Pipeline** — Kanban board (Draft → Quoted → Accepted → Lost)
3. **Performance** — KPIs, weekly trend chart, funnel, suburb breakdown, leaderboard
4. **Leads** — Sortable/filterable table with lead source attribution
5. **Follow-up** (`viewFollowup`, `data-view="followup"`) — Khairo's read-only fencing follow-up cockpit: stats strip, "who to chase next" call list, quote/deal pipeline, and a personal localStorage to-do list. Reads `v_sales_priority` (filtered `job_type='fencing'` + `is_primary_for_contact`) via `cloud.supabase`. All `fu*` JS/CSS. No DB writes, no sending. Separate from the older `viewCockpit` (Rep Cockpit v2, commission/rep-queue via reporting-api).

### Key Design Decisions
- Salesperson tracking uses `jobs.created_by` (no migration needed)
- Lead source data from `contact_matches` table (LEFT JOIN)
- Desktop: header nav buttons | Mobile: fixed bottom nav
- Chart.js for all charts

---

## Shared File Sync

`cloud.js` and `brand.js` are copies from canonical sources:
- `cloud.js` canonical: `~/Projects/patio-tool/tools/shared/cloud.js`
- `brand.js` canonical: `~/Projects/secureworks-site/dashboard/shared/brand.js`

These will drift. Known debt across all repos.

---

## Git Workflow

```bash
git pull origin main
# Make changes
git add sale.html
git commit -m "Description"
git push origin main
```

Deployed via GitHub Pages — pushes go live immediately.

---

## Owner

**Marnin Stobbe** — SecureWorks WA founder
- GitHub: SecureWorks-GROUP

<!-- branch-protection mergeability probe — will be reverted/no-op -->

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
