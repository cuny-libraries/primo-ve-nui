# Medgar Evers College

**Primo view code**: `CUNY_ME`
**OneSearch**: <https://cuny-me.primo.exlibrisgroup.com/discovery/search?vid=01CUNY_ME:CUNY_ME>
**Campus website**: <https://www.mec.cuny.edu/>

A liberal arts college in Crown Heights, Brooklyn, named for civil rights leader Medgar Evers.

---

## Brand / Identity Guide

- [Medgar Evers Creative Services](https://ares.mec.cuny.edu/office-of-communications/external-internal-communications/creative-services/)
- [Brand Guide PDF](https://www2.cuny.edu/wp-content/uploads/sites/4/page-assets/about/administration/offices/communications-marketing/services/marketing-branding/downloads/cuny-colleges/Official_Graphic_Identity_System2014.pdf)

> Medgar Evers uses black, gold, and white as official brand colors. The current primary (#666666 gray) diverges from the official black identity. Consider using a dark color to better represent the brand.


## Official Brand Colors

| Name | Role | Hex | Pantone | Contrast on white |
|------|------|-----|---------|-------------------|
| MEC Black | Primary | `#231f20` | Black | 16.30:1  |
| MEC Gold | Secondary | `#ffcc00` | — | 1.51:1 **FAIL** |

---

## Current `colors.json.txt`

```json
{
  "primary": "#666666",
  "secondary": "#ffcc00",
  "backgroundColor": "#ffffff",
  "links": "#5C92BD",
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
| `primary (as text)` | `#666666` | 5.74:1 | PASS |
| `secondary (as button text)` | `#ffcc00` | 1.51:1 | **FAIL** |
| `links` | `#5C92BD` | 3.33:1 | PASS (large text only) |

> **Action required**: The following colors fail WCAG 2.1 AA (4.5:1 for normal text) against the white background:
>
> - links `#5C92BD` (3.33:1)
> - secondary `#ffcc00` (1.51:1, fails even for large text)

### Issues to fix

- **links** `#5C92BD` (medium blue, 3.33:1) fails AA for normal text. Replace with a darker blue, e.g. `#1a5f8a` (5.3:1) or the official dark primary.

> **Note on secondary color**: The secondary color is used as button text (`.md-button.md-secondary`) on a transparent/white background. Yellow, gold, and light accent colors almost always fail 4.5:1 on white. If the secondary is used only as a background fill with white text on top, ensure _white-on-secondary_ contrast meets 4.5:1 instead.

---

## Recommendations

- [ ] Fix #5C92BD: verify or replace `#5C92BD` with an accessible alternative that also aligns with official brand colors
- [ ] Fix #ffcc00: verify or replace `#ffcc00` with an accessible alternative that also aligns with official brand colors
- [ ] Verify secondary color in actual usage context (button text vs. fill background)
- [ ] Run [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or [axe DevTools](https://www.deque.com/axe/) against the live Primo page
- [ ] Check focus indicator contrast (WCAG 2.1 SC 1.4.11 — 3:1 minimum for non-text contrast)
- [ ] Confirm all images in `img/` have appropriate alt text in HTML templates
