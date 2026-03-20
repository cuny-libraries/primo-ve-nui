# Hostos Community College

**Primo view code**: `CUNY_HO`
**OneSearch**: <https://cuny-ho.primo.exlibrisgroup.com/discovery/search?vid=01CUNY_HO:CUNY_HO>
**Campus website**: <https://www.hostos.cuny.edu/>

A bilingual (English/Spanish) community college in the South Bronx, named for Eugenio Maria de Hostos.

---

## Brand / Identity Guide

- [Hostos Media Guidelines](https://www.hostos.cuny.edu/Administrative-Offices/Office-of-the-President/Office-of-Communications/Media-Guidelines)
- [Brand Guide PDF](https://www.cuny.edu/wp-content/uploads/sites/4/page-assets/about/administration/offices/communications-marketing/services/marketing-branding/downloads/cuny-colleges/Hostos_Branding_Manual.pdf)

> Current primary (#314d89) is a lighter blue than the official Hostos Blue (#003087, PMS 294 C). Secondary (#ffbc3a) is gold/amber rather than the official Hostos orange (#e35205). Consider aligning to the official palette.


## Official Brand Colors

| Name | Role | Hex | Pantone | Contrast on white |
|------|------|-----|---------|-------------------|
| Hostos Blue | Primary | `#003087` | PMS 294 C | 11.85:1  |
| Hostos Orange | Secondary | `#e35205` | PMS 144 C | 3.84:1 *(large text only)* |
| Hostos Gold | Accent | `#c89520` | PMS 110 C | 2.70:1 **FAIL** |

---

## Current `colors.json.txt`

```json
{
  "primary": "#314d89",
  "secondary": "#ffbc3a",
  "backgroundColor": "#ffffff",
  "links": "#007da7",
  "warning": "#ff6347",
  "positive": "#0f7d00",
  "negative": "#808080",
  "notice": "#e08303"
}
```

---

## WCAG 2.1 AA Compliance

**Minimum ratios**: 4.5:1 for normal text, 3:1 for large text (18pt / 14pt bold) and UI components.

| Color role | Current hex | Contrast on white | Status |
|------------|-------------|-------------------|--------|
| `primary (as text)` | `#314d89` | 8.22:1 | PASS |
| `secondary (as button text)` | `#ffbc3a` | 1.68:1 | **FAIL** |
| `links` | `#007da7` | 4.68:1 | PASS |

> **Action required**: The following colors fail WCAG 2.1 AA (4.5:1 for normal text) against the white background:
>
> - secondary `#ffbc3a` (1.68:1, fails even for large text)


> **Note on secondary color**: The secondary color is used as button text (`.md-button.md-secondary`) on a transparent/white background. Yellow, gold, and light accent colors almost always fail 4.5:1 on white. If the secondary is used only as a background fill with white text on top, ensure _white-on-secondary_ contrast meets 4.5:1 instead.

---

## Recommendations

- [ ] Fix #ffbc3a: verify or replace `#ffbc3a` with an accessible alternative that also aligns with official brand colors
- [ ] Verify secondary color in actual usage context (button text vs. fill background)
- [ ] Run [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or [axe DevTools](https://www.deque.com/axe/) against the live Primo page
- [ ] Check focus indicator contrast (WCAG 2.1 SC 1.4.11 — 3:1 minimum for non-text contrast)
- [ ] Confirm all images in `img/` have appropriate alt text in HTML templates
